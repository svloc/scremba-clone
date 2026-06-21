import { createAction, props } from '@ngrx/store';
import type { NotificationEntity } from './notifications.models';

export const loadNotificationsRequested = createAction(
  '[Notifications] Load Requested',
  props<{ userId: string }>()
);

export const loadNotificationsSucceeded = createAction(
  '[Notifications] Load Succeeded',
  props<{ notifications: NotificationEntity[] }>()
);

export const loadNotificationsFailed = createAction(
  '[Notifications] Load Failed',
  props<{ error: string }>()
);

export const markNotificationRead = createAction(
  '[Notifications] Mark Read',
  props<{ id: string; read: boolean }>()
);

