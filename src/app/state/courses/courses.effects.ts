import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { catchError, filter, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { loadCoursesFailed, loadCoursesRequested, loadCoursesSucceeded } from './courses.actions';
import { selectCoursesLoaded } from './courses.selectors';
import type { CourseEntity } from './courses.models';

@Injectable()
export class CoursesEffects {
  readonly loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCoursesRequested),
      withLatestFrom(this.store.pipe(select(selectCoursesLoaded))),
      filter(([, isLoaded]) => !isLoaded),
      switchMap(() =>
        from(fetch('assets/mock-data/courses.json')).pipe(
          switchMap((r) => from(r.json() as Promise<CourseEntity[]>)),
          map((courses) => loadCoursesSucceeded({ courses })),
          catchError((err) => of(loadCoursesFailed({ error: String(err) })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store
  ) {}
}


