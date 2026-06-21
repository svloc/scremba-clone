import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesAdapter, type CoursesState } from './courses.reducer';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const {
  selectAll: selectAllCourses,
  selectEntities: selectCoursesEntities
} = coursesAdapter.getSelectors(selectCoursesState);

export const selectCourseById = (id: string) =>
  createSelector(selectCoursesState, (s) => s.entities[id]);


export const selectCoursesLoading = createSelector(
  selectCoursesState,
  (s) => s.loading
);

export const selectCoursesLoaded = createSelector(
  selectCoursesState,
  (s) => s.isLoaded
);

