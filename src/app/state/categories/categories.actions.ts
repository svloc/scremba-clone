import { createAction, props } from '@ngrx/store';
import type { CategoryEntity } from './categories.models';

export const loadCategoriesRequested = createAction('[Categories] Load Requested');
export const loadCategoriesSucceeded = createAction(
  '[Categories] Load Succeeded',
  props<{ categories: CategoryEntity[] }>()
);
export const loadCategoriesFailed = createAction(
  '[Categories] Load Failed',
  props<{ error: string }>()
);

