import { createAction, props } from '@ngrx/store';
import type { CourseEntity } from './courses.models';

export const loadCoursesRequested = createAction('[Courses] Load Requested');
export const loadCoursesSucceeded = createAction(
  '[Courses] Load Succeeded',
  props<{ courses: CourseEntity[] }>()
);
export const loadCoursesFailed = createAction(
  '[Courses] Load Failed',
  props<{ error: string }>()
);

