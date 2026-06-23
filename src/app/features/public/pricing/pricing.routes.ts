import { Routes } from '@angular/router';
import { PricingPage } from './pricing.page';

export const pricingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => PricingPage
  }
];

