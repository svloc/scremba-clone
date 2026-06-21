import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { loadUserFailed, loadUserRequested, loadUserSucceeded } from './user.actions';
import { selectCurrentUserId } from './user.selectors';

@Injectable()
export class UserEffects {
  // Since auth is mock in the AuthService, we “load” the current user
  // from AuthService's already loaded user list.
  readonly loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserRequested),
      withLatestFrom(this.store.pipe(select(selectCurrentUserId))),
      switchMap(async ([action]) => {
        // No backend: just resolve from AuthService in-memory.
        const authUser = this.auth.currentUser();
        if (!authUser || authUser.id !== action.userId) {
          return loadUserFailed({ error: 'User not found in AuthService.' });
        }

        return loadUserSucceeded({
          user: {
            id: authUser.id,
            email: authUser.email,
            firstName: authUser.firstName,
            lastName: authUser.lastName,
            role: authUser.role,
            avatarUrl: authUser.avatarUrl
          }
        });
      }),
      catchError((err) => of(loadUserFailed({ error: String(err) })))
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly auth: AuthService
  ) {}
}

