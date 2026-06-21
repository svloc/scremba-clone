import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, type EntityState } from '@ngrx/entity';
import type { CategoryEntity } from './categories.models';
import { loadCategoriesFailed, loadCategoriesRequested, loadCategoriesSucceeded } from './categories.actions';

export interface CategoriesState extends EntityState<CategoryEntity> {
  isLoaded: boolean;
  loading: boolean;
  error: string | null;
}

export const categoriesAdapter = createEntityAdapter<CategoryEntity>({
  selectId: (c) => c.id
});

export const initialCategoriesState: CategoriesState = categoriesAdapter.getInitialState({
  isLoaded: false,
  loading: false,
  error: null
});

export const categoriesReducer = createReducer(
  initialCategoriesState,
  on(loadCategoriesRequested, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadCategoriesSucceeded, (state, { categories }) =>
    categoriesAdapter.setAll(categories, {
      ...state,
      isLoaded: true,
      loading: false,
      error: null
    })
  ),
  on(loadCategoriesFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

