import { createAction, props } from '@ngrx/store';
import type { UserEntity, UserSession } from './user.models';

export const hydrateUserFromAuth = createAction(
  '[User] Hydrate From Auth Service',
  props<{ session: UserSession | null }>()
);

export const loadUserRequested = createAction('[User] Load Requested', props<{ userId: string }>());
export const loadUserSucceeded = createAction(
  '[User] Load Succeeded',
  props<{ user: UserEntity }>()
);
export const loadUserFailed = createAction('[User] Load Failed', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');

