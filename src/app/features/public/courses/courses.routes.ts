import { Routes } from '@angular/router';
import { CoursesPage } from './courses.page';

export const coursesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => CoursesPage
  }
];

