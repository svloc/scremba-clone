import { createFeatureSelector, createSelector } from '@ngrx/store';
import { categoriesAdapter, type CategoriesState } from './categories.reducer';

export const selectCategoriesState = createFeatureSelector<CategoriesState>('categories');

export const {
  selectAll: selectAllCategories,
  selectEntities: selectCategoryEntities,
  selectIds: selectCategoryIds
} = categoriesAdapter.getSelectors(selectCategoriesState);

export const selectCategoryById = (id: string) =>
  createSelector(selectCategoriesState, (s) => s.entities[id]);


export const selectCategoriesLoading = createSelector(
  selectCategoriesState,
  (s) => s.loading
);

export const selectCategoriesLoaded = createSelector(
  selectCategoriesState,
  (s) => s.isLoaded
);

