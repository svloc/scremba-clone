import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, type EntityState } from '@ngrx/entity';
import type { UserEntity } from './user.models';
import { hydrateUserFromAuth, loadUserFailed, loadUserRequested, loadUserSucceeded, logout } from './user.actions';

export interface UserState extends EntityState<UserEntity> {
  currentUserId: string | null;
  isLoaded: boolean;
  loading: boolean;
  error: string | null;
}

export const userAdapter = createEntityAdapter<UserEntity>({ selectId: (u) => u.id });

export const initialUserState: UserState = userAdapter.getInitialState({
  currentUserId: null,
  isLoaded: false,
  loading: false,
  error: null
});

export const userReducer = createReducer(
  initialUserState,
  on(hydrateUserFromAuth, (state, { session }) => {
    if (!session) {
      return {
        ...state,
        currentUserId: null,
        isLoaded: false,
        loading: false,
        error: null
      };
    }

    return {
      ...state,
      currentUserId: session.userId,
      isLoaded: false,
      loading: false,
      error: null
    };
  }),
  on(loadUserRequested, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadUserSucceeded, (state, { user }) =>
    userAdapter.upsertOne(user, {
      ...state,
      isLoaded: true,
      loading: false,
      error: null,
      currentUserId: user.id
    })
  ),
  on(loadUserFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(logout, () => initialUserState)
);

