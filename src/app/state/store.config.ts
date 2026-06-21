import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { CoursesEffects } from './courses/courses.effects';
import { coursesReducer } from './courses/courses.reducer';

import { CategoriesEffects } from './categories/categories.effects';
import { categoriesReducer } from './categories/categories.reducer';

import { InstructorsEffects } from './instructors/instructors.effects';
import { instructorsReducer } from './instructors/instructors.reducer';

import { ProgressEffects } from './progress/progress.effects';
import { progressReducer } from './progress/progress.reducer';

import { UserEffects } from './user/user.effects';
import { userReducer } from './user/user.reducer';

import { NotificationsEffects } from './notifications/notifications.effects';
import { notificationsReducer } from './notifications/notifications.reducer';

export const stateProviders = [
  provideStore({
    courses: coursesReducer,
    categories: categoriesReducer,
    instructors: instructorsReducer,
    progress: progressReducer,
    user: userReducer,
    notifications: notificationsReducer
  }),
  provideEffects([
    CoursesEffects,
    CategoriesEffects,
    InstructorsEffects,
    ProgressEffects,
    UserEffects,
    NotificationsEffects
  ])
] as const;

