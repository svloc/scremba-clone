import { Routes } from '@angular/router';
import { CoursesPage } from './courses.page';
import { authGuard } from '../../auth/guards/auth.guard';

export const coursesRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard(['student', 'admin'])],
    loadComponent: () => CoursesPage
  }
];




