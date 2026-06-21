import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { loadNotificationsFailed, loadNotificationsRequested, loadNotificationsSucceeded } from './notifications.actions';
import type { NotificationEntity } from './notifications.models';
import { selectNotificationsState } from './notifications.selectors';

@Injectable()
export class NotificationsEffects {
  readonly loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotificationsRequested),
      switchMap((action) =>
        this.store.select(selectNotificationsState).pipe(
          // load-once per userId
          switchMap((state) => {
            if (state.isLoadedForUserId === action.userId) {
              return of(loadNotificationsSucceeded({ notifications: state.ids.map((id) => state.entities[id]!).filter(Boolean) }));
            }

            return from(fetch('assets/mock-data/notifications.json')).pipe(
              switchMap((r) => from(r.json() as Promise<NotificationEntity[]>)),
              map((all) => all.filter((n) => n.userId === action.userId)),
              map((notifications) => loadNotificationsSucceeded({ notifications })),
              catchError((err) => of(loadNotificationsFailed({ error: String(err) })))
            );
          })
        )
      )
    )
  );

  constructor(private readonly actions$: Actions, private readonly store: Store) {}
}


