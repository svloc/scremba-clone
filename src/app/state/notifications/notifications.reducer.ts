import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, type EntityState } from '@ngrx/entity';
import type { NotificationEntity } from './notifications.models';
import {
  loadNotificationsFailed,
  loadNotificationsRequested,
  loadNotificationsSucceeded,
  markNotificationRead
} from './notifications.actions';

export interface NotificationsState extends EntityState<NotificationEntity> {
  isLoadedForUserId: string | null;
  loading: boolean;
  error: string | null;
}

export const notificationsAdapter = createEntityAdapter<NotificationEntity>({
  selectId: (n) => n.id
});

export const initialNotificationsState: NotificationsState = notificationsAdapter.getInitialState({
  isLoadedForUserId: null,
  loading: false,
  error: null
});

export const notificationsReducer = createReducer(
  initialNotificationsState,
  on(loadNotificationsRequested, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadNotificationsSucceeded, (state, { notifications }) => {
    const userId = notifications[0]?.userId ?? null;
    return notificationsAdapter.setAll(notifications, {
      ...state,
      loading: false,
      error: null,
      isLoadedForUserId: userId
    });
  }),
  on(loadNotificationsFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(markNotificationRead, (state, { id, read }) =>
    notificationsAdapter.updateOne({ id, changes: { read } }, state)
  )
);

