import { createAction, props } from '@ngrx/store';
import type { InstructorEntity } from './instructors.models';

export const loadInstructorsRequested = createAction('[Instructors] Load Requested');
export const loadInstructorsSucceeded = createAction(
  '[Instructors] Load Succeeded',
  props<{ instructors: InstructorEntity[] }>()
);
export const loadInstructorsFailed = createAction(
  '[Instructors] Load Failed',
  props<{ error: string }>()
);

