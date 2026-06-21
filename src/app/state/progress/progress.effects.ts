import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { catchError, filter, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { loadProgressFailed, loadProgressRequested, loadProgressSucceeded } from './progress.actions';
import { selectProgressLoaded } from './progress.selectors';
import type { ProgressEntity } from './progress.models';

type RawProgressRow = {
  userId: string;
  courseId: string;
  completedLessonIds: string[];
  lastWatchedLessonId: string | null;
  updatedAt: string;
};

@Injectable()
export class ProgressEffects {
  readonly loadProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProgressRequested),
      withLatestFrom(this.store.pipe(select(selectProgressLoaded))),
      filter(([, isLoaded]) => !isLoaded),
      switchMap(() =>
        from(fetch('assets/mock-data/progress.json')).pipe(
          switchMap((r) => from(r.json() as Promise<RawProgressRow[]>)),
          map((rows) => {
            const progress: ProgressEntity[] = rows.map((row) => ({
              id: `${row.userId}::${row.courseId}`,
              ...row
            }));
            return loadProgressSucceeded({ progress });
          }),
          catchError((err) => of(loadProgressFailed({ error: String(err) })))
        )
      )
    )
  );

  constructor(private readonly actions$: Actions, private readonly store: Store) {}
}

