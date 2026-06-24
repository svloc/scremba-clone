import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { loadCoursesRequested } from '../../../state/courses/courses.actions';
import { selectCourseById, selectCoursesLoading } from '../../../state/courses/courses.selectors';

import { loadInstructorsRequested } from '../../../state/instructors/instructors.actions';
import { selectInstructorById } from '../../../state/instructors/instructors.selectors';
import { loadCategoriesRequested } from '../../../state/categories/categories.actions';
import { selectCategoryById } from '../../../state/categories/categories.selectors';

import { loadProgressRequested } from '../../../state/progress/progress.actions';

import { AuthService } from '../../../core/auth/auth.service';




@Component({
  selector: 'app-course-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="page" *ngIf="course(); else loadingTpl">
      <header class="header">
        <a class="back" routerLink="/courses">← Back to courses</a>

        <h1 class="title">{{ course()!.title }}</h1>
        <p class="subtitle">{{ course()!.subtitle }}</p>

        <div class="row">
          <span class="pill">{{ course()!.difficulty }}</span>
          <span class="pill">{{ course()!.durationHours }}h</span>
          <span class="pill">⭐ {{ course()!.rating.toFixed(1) }}</span>
        </div>
      </header>

      <section class="section">
        <div class="thumbWrap">
          <img class="thumb" [src]="course()!.thumbnailUrl" [alt]="course()!.title" />
        </div>

        <div class="content">
          <h2 class="h2">What you will learn</h2>
          <ul class="list">
            <li *ngFor="let obj of course()!.learningObjectives">{{ obj }}</li>
          </ul>

          <div class="metaGrid">
            <div class="metaCard">
              <h3 class="h3">Instructor</h3>
              <div class="instructor" *ngIf="instructor()">
                <img class="avatar" [src]="instructor()!.avatarUrl" [alt]="instructor()!.name" />
                <div>
                  <div class="instrName">{{ instructor()!.name }}</div>
                  <div class="instrHeadline">{{ instructor()!.headline }}</div>
                </div>
              </div>
              <div class="muted" *ngIf="!instructor()">Loading instructor…</div>
            </div>

            <div class="metaCard">
              <h3 class="h3">Categories</h3>
              <div class="cats">
                <span class="cat" *ngFor="let id of course()!.categoryIds">
                  {{ categoriesById(id)?.name ?? id }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <ng-template #loadingTpl>
      <main class="page">
        <div class="loading" *ngIf="loading$ | async">Loading course…</div>
        <div class="empty" *ngIf="(loading$ | async) === false">Course not found.</div>
      </main>
    </ng-template>
  `,
  styles: [
    `.page{max-width:1080px;margin:0 auto;padding:24px}`,
    `.header{margin:12px 0 24px}`,
    `.back{display:inline-block;margin-bottom:10px;color:#5035ff;text-decoration:none;font-weight:600}`,
    `.title{font-size:28px;margin-bottom:8px}`,
    `.subtitle{color:rgba(0,0,0,.65);margin-bottom:14px}`,
    `.row{display:flex;gap:8px;flex-wrap:wrap}`,
    `.pill{font-size:12px;padding:6px 10px;border-radius:999px;background:rgba(232,76,138,.08);color:#b51f60;font-weight:700}`,
    `.section{display:grid;grid-template-columns:1fr;gap:18px}`,
    `.thumbWrap{border-radius:14px;overflow:hidden;border:1px solid rgba(0,0,0,.08);background:#fff}`,
    `.thumb{width:100%;height:240px;object-fit:cover;display:block}`,
    `.content{border-radius:14px;border:1px solid rgba(0,0,0,.08);background:#fff;padding:18px}`,
    `.h2{font-size:18px;margin-bottom:10px}`,
    `.list{margin-left:18px;color:rgba(0,0,0,.75);display:flex;flex-direction:column;gap:8px}`,
    `.metaGrid{margin-top:18px;display:grid;grid-template-columns:1fr;gap:12px}`,
    `.metaCard{border:1px solid rgba(0,0,0,.08);border-radius:12px;padding:14px}`,
    `.h3{font-size:14px;margin-bottom:10px}`,
    `.instructor{display:flex;gap:12px;align-items:center}`,
    `.avatar{width:54px;height:54px;border-radius:50%;object-fit:cover;background:#f5f5f7}`,
    `.instrName{font-weight:800;margin-bottom:2px}`,
    `.instrHeadline{color:rgba(0,0,0,.65);font-size:13px}`,
    `.cats{display:flex;gap:8px;flex-wrap:wrap}`,
    `.cat{font-size:12px;padding:6px 10px;border-radius:999px;background:rgba(80,53,255,.08);color:#5035ff;font-weight:700}`,
    `.muted{color:rgba(0,0,0,.65);font-weight:600}`,
    `.loading,.empty{margin-top:24px;color:rgba(0,0,0,.65);font-weight:700}`,
    `@media (min-width:780px){.section{grid-template-columns:360px 1fr}.metaGrid{grid-template-columns:1fr 1fr}}`
  ]
})
export class CourseDetailsPage {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);


  readonly loading$ = this.store.select(selectCoursesLoading);

  readonly courseId = computed(() => this.route.snapshot.paramMap.get('courseId') || '');
  readonly course = this.store.selectSignal(selectCourseById(this.courseId()));

  readonly instructor = computed(() => {
    const c = this.course();
    if (!c) return null;
    return this.store.selectSignal(selectInstructorById(c.instructorId))();
  });


  constructor() {
    // Ensure data is available for details page (public)
    this.store.dispatch(loadCoursesRequested());
    this.store.dispatch(loadInstructorsRequested());
    this.store.dispatch(loadCategoriesRequested());

    // Load progress only for logged-in users
    // (progress selectors are keyed by `${userId}::${courseId}`)
    this.auth.hydrateFromStorage().then(() => {
      if (this.auth.currentUser()) {
        this.store.dispatch(loadProgressRequested());
      }
    });
  }


  categoriesById = (id: string) => this.store.selectSignal(selectCategoryById(id))();
}


