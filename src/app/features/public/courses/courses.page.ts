import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { loadCoursesRequested } from '../../../state/courses/courses.actions';

import { selectAllCourses, selectCoursesLoading } from '../../../state/courses/courses.selectors';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="page">
      <header class="header">
        <h1>Courses</h1>
        <p class="sub">Browse the curriculum. Data is loaded from local JSON via NgRx.</p>
      </header>

      <div class="loading" *ngIf="loading$ | async">Loading courses…</div>

      <section class="grid" *ngIf="(loading$ | async) === false">
        <a class="card" *ngFor="let c of courses$ | async" [routerLink]="['/courses', c.id]">

          <img [src]="(c.thumbnailUrl?.startsWith('assets/') ? '/' + c.thumbnailUrl : c.thumbnailUrl) ?? ''" [alt]="c.title" class="thumb" />
          <div class="meta">
            <h2 class="title">{{ c.title }}</h2>
            <p class="subtitle">{{ c.subtitle }}</p>
            <div class="row">
              <span class="pill">{{ c.difficulty }}</span>
              <span class="pill">{{ c.durationHours }}h</span>
              <span class="pill">⭐ {{ c.rating.toFixed(1) }}</span>
            </div>
          </div>
        </a>
      </section>

      <div class="empty" *ngIf="(loading$ | async) === false && (courses$ | async)?.length === 0">
        No courses loaded.
      </div>
    </main>
  `,
  styles: [
    `.page{max-width:1080px;margin:0 auto;padding:24px}`,
    `.header{margin:12px 0 24px}`,
    `h1{font-size:28px;margin-bottom:6px}`,
    `.sub{color:rgba(0,0,0,.65);font-size:14px}`,
    `.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}`,
    `.card{border:1px solid rgba(0,0,0,.08);border-radius:14px;overflow:hidden;background:white}`,
    `.thumb{width:100%;height:140px;object-fit:cover;background:#f5f5f7}`,
    `.meta{padding:14px}`,
    `.title{font-size:16px;line-height:1.25;margin-bottom:6px}`,
    `.subtitle{font-size:13px;color:rgba(0,0,0,.7);min-height:34px}`,
    `.row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}`,
    `.pill{font-size:12px;padding:6px 10px;border-radius:999px;background:rgba(232,76,138,.08);color:#b51f60;font-weight:700}`,
    `.loading,.empty{margin-top:18px;color:rgba(0,0,0,.65);font-weight:600}`,
    `.empty{font-size:14px}`
  ]
})
export class CoursesPage {
  readonly courses$;
  readonly loading$;

  constructor(private readonly store: Store) {
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCoursesLoading);

    // Always request courses on each visit; effects handle caching/recovery.
    this.store.dispatch(loadCoursesRequested());
  }
}





