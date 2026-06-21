import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, type EntityState } from '@ngrx/entity';
import type { ProgressEntity } from './progress.models';
import {
  loadProgressFailed,
  loadProgressRequested,
  loadProgressSucceeded,
  markLessonComplete,
  setLastWatchedLesson
} from './progress.actions';

export interface ProgressState extends EntityState<ProgressEntity> {
  isLoaded: boolean;
  loading: boolean;
  error: string | null;
}

export const progressAdapter = createEntityAdapter<ProgressEntity>({
  selectId: (p) => p.id
});

export const initialProgressState: ProgressState = progressAdapter.getInitialState({
  isLoaded: false,
  loading: false,
  error: null
});

export const progressReducer = createReducer(
  initialProgressState,
  on(loadProgressRequested, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadProgressSucceeded, (state, { progress }) =>
    progressAdapter.setAll(progress, {
      ...state,
      isLoaded: true,
      loading: false,
      error: null
    })
  ),
  on(loadProgressFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(markLessonComplete, (state, { userId, courseId, lessonId, completedAt }) => {
    const id = `${userId}::${courseId}`;
    const existing = state.entities[id];

    const next: ProgressEntity = existing
      ? {
          ...existing,
          completedLessonIds: Array.from(new Set([...existing.completedLessonIds, lessonId])),
          lastWatchedLessonId: lessonId,
          updatedAt: completedAt
        }
      : {
          id,
          userId,
          courseId,
          completedLessonIds: [lessonId],
          lastWatchedLessonId: lessonId,
          updatedAt: completedAt
        };

    return progressAdapter.upsertOne(next, state);
  }),
  on(setLastWatchedLesson, (state, { userId, courseId, lessonId, updatedAt }) => {
    const id = `${userId}::${courseId}`;
    const existing = state.entities[id];

    const next: ProgressEntity = existing
      ? {
          ...existing,
          lastWatchedLessonId: lessonId,
          updatedAt
        }
      : {
          id,
          userId,
          courseId,
          completedLessonIds: [],
          lastWatchedLessonId: lessonId,
          updatedAt
        };

    return progressAdapter.upsertOne(next, state);
  })
);

