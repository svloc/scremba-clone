import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { catchError, filter, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { loadCategoriesFailed, loadCategoriesRequested, loadCategoriesSucceeded } from './categories.actions';
import { selectCategoriesLoaded } from './categories.selectors';
import type { CategoryEntity } from './categories.models';

@Injectable()
export class CategoriesEffects {
  readonly loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategoriesRequested),
      withLatestFrom(this.store.pipe(select(selectCategoriesLoaded))),
      filter(([, isLoaded]) => !isLoaded),
      switchMap(() =>
        from(fetch('assets/mock-data/categories.json')).pipe(
          switchMap((r) => from(r.json() as Promise<CategoryEntity[]>)),
          map((categories) => loadCategoriesSucceeded({ categories })),
          catchError((err) => of(loadCategoriesFailed({ error: String(err) })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store
  ) {}
}

