import { createAction, props } from '@ngrx/store';
import type { ProgressEntity } from './progress.models';

export const loadProgressRequested = createAction('[Progress] Load Requested');
export const loadProgressSucceeded = createAction(
  '[Progress] Load Succeeded',
  props<{ progress: ProgressEntity[] }>()
);
export const loadProgressFailed = createAction(
  '[Progress] Load Failed',
  props<{ error: string }>()
);

export const markLessonComplete = createAction(
  '[Progress] Mark Lesson Complete',
  props<{ userId: string; courseId: string; lessonId: string; completedAt: string }>()
);

export const setLastWatchedLesson = createAction(
  '[Progress] Set Last Watched Lesson',
  props<{ userId: string; courseId: string; lessonId: string; updatedAt: string }>()
);

