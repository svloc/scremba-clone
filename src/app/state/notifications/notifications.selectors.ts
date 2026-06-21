import { createFeatureSelector, createSelector } from '@ngrx/store';
import { notificationsAdapter, type NotificationsState } from './notifications.reducer';

export const selectNotificationsState = createFeatureSelector<NotificationsState>('notifications');

export const {
  selectAll: selectAllNotifications,
  selectEntities: selectNotificationEntities,
  selectIds: selectNotificationIds
} = notificationsAdapter.getSelectors(selectNotificationsState);

export const selectNotificationsLoading = createSelector(
  selectNotificationsState,
  (s) => s.loading
);

export const selectIsNotificationsLoadedForUserId = (userId: string) =>
  createSelector(selectNotificationsState, (s) => s.isLoadedForUserId === userId);

