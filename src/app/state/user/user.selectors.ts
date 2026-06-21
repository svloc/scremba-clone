import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userAdapter, type UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const {
  selectAll: selectAllUsers,
  selectEntities: selectUserEntities,
  selectIds: selectUserIds
} = userAdapter.getSelectors(selectUserState);

export const selectCurrentUserId = createSelector(
  selectUserState,
  (s) => s.currentUserId
);

export const selectCurrentUser = createSelector(
  selectUserState,
  (s) => (s.currentUserId ? s.entities[s.currentUserId] ?? null : null)
);

export const selectUserLoaded = createSelector(
  selectUserState,
  (s) => s.isLoaded
);

export const selectUserLoading = createSelector(
  selectUserState,
  (s) => s.loading
);

