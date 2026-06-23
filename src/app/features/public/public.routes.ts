import { Routes } from '@angular/router';

export const publicRoutes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.routes').then((m) => m.coursesRoutes)
  },
  {
    path: 'pricing',
    loadChildren: () => import('./pricing/pricing.routes').then((m) => m.pricingRoutes)
  }
];


