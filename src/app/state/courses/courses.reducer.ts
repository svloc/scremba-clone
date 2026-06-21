import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import type { CourseEntity } from './courses.models';
import { loadCoursesFailed, loadCoursesRequested, loadCoursesSucceeded } from './courses.actions';

export interface CoursesState extends EntityState<CourseEntity> {
  isLoaded: boolean;
  loading: boolean;
  error: string | null;
}

export const coursesAdapter = createEntityAdapter<CourseEntity>({ selectId: c => c.id });

export const initialCoursesState: CoursesState = coursesAdapter.getInitialState({
  isLoaded: false,
  loading: false,
  error: null
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(loadCoursesRequested, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadCoursesSucceeded, (state, { courses }) => {
    return coursesAdapter.setAll(courses, {
      ...state,
      isLoaded: true,
      loading: false,
      error: null
    });
  }),
  on(loadCoursesFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

