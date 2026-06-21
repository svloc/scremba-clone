import { createFeatureSelector, createSelector } from '@ngrx/store';
import { instructorsAdapter, type InstructorsState } from './instructors.reducer';

export const selectInstructorsState = createFeatureSelector<InstructorsState>('instructors');

export const {
  selectAll: selectAllInstructors,
  selectEntities: selectInstructorEntities,
  selectIds: selectInstructorIds
} = instructorsAdapter.getSelectors(selectInstructorsState);

export const selectInstructorById = (id: string) =>
  createSelector(selectInstructorsState, (s) => s.entities[id]);


export const selectInstructorsLoading = createSelector(
  selectInstructorsState,
  (s) => s.loading
);

export const selectInstructorsLoaded = createSelector(
  selectInstructorsState,
  (s) => s.isLoaded
);

