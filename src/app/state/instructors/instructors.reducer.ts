import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, type EntityState } from '@ngrx/entity';
import type { InstructorEntity } from './instructors.models';
import { loadInstructorsFailed, loadInstructorsRequested, loadInstructorsSucceeded } from './instructors.actions';

export interface InstructorsState extends EntityState<InstructorEntity> {
  isLoaded: boolean;
  loading: boolean;
  error: string | null;
}

export const instructorsAdapter = createEntityAdapter<InstructorEntity>({
  selectId: (i) => i.id
});

export const initialInstructorsState: InstructorsState = instructorsAdapter.getInitialState({
  isLoaded: false,
  loading: false,
  error: null
});

export const instructorsReducer = createReducer(
  initialInstructorsState,
  on(loadInstructorsRequested, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadInstructorsSucceeded, (state, { instructors }) =>
    instructorsAdapter.setAll(instructors, {
      ...state,
      isLoaded: true,
      loading: false,
      error: null
    })
  ),
  on(loadInstructorsFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

