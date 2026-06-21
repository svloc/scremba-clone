import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { catchError, filter, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { loadInstructorsFailed, loadInstructorsRequested, loadInstructorsSucceeded } from './instructors.actions';
import { selectInstructorsLoaded } from './instructors.selectors';
import type { InstructorEntity } from './instructors.models';

@Injectable()
export class InstructorsEffects {
  readonly loadInstructors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadInstructorsRequested),
      withLatestFrom(this.store.pipe(select(selectInstructorsLoaded))),
      filter(([, isLoaded]) => !isLoaded),
      switchMap(() =>
        from(fetch('assets/mock-data/instructors.json')).pipe(
          switchMap((r) => from(r.json() as Promise<InstructorEntity[]>)),
          map((instructors) => loadInstructorsSucceeded({ instructors })),
          catchError((err) => of(loadInstructorsFailed({ error: String(err) })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store
  ) {}
}

