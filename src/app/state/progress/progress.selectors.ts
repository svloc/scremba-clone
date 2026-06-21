import { createFeatureSelector, createSelector } from '@ngrx/store';
import { progressAdapter, type ProgressState } from './progress.reducer';

export const selectProgressState = createFeatureSelector<ProgressState>('progress');

export const {
  selectAll: selectAllProgress,
  selectEntities: selectProgressEntities,
  selectIds: selectProgressIds
} = progressAdapter.getSelectors(selectProgressState);

export const selectProgressLoading = createSelector(
  selectProgressState,
  (s) => s.loading
);

export const selectProgressLoaded = createSelector(
  selectProgressState,
  (s) => s.isLoaded
);

export const selectProgressByUserCourse = (userId: string, courseId: string) =>
  createSelector(selectProgressState, (s) => s.entities[`${userId}::${courseId}`] ?? null);

