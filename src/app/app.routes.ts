import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { LogoutComponent } from './features/auth/logout/logout.component';
import { authGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Public feature areas (lazy)
  {
    path: '',
    loadChildren: () => import('./features/public/public.routes').then((m) => m.publicRoutes)
  },

  // Auth (public)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'logout', component: LogoutComponent },

  // Course details (Public)
  {
    path: 'courses/:courseId',
    loadComponent: () => import('./features/public/courses/course-details.page').then((m) => m.CourseDetailsPage)
  },

  // Protected stubs (until Phase 5 student/admin features are implemented)
  { path: 'dashboard', canActivate: [authGuard(['student', 'admin'])], component: HomeComponent },
  { path: 'admin', canActivate: [authGuard(['admin'])], component: HomeComponent },


  { path: '**', redirectTo: '' }
];


