import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import type { UserRole } from '../../../core/auth/auth.models';

export function authGuard(allowedRoles: UserRole[] = ['student', 'admin']): CanActivateFn {
  return async () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    await auth.hydrateFromStorage();

    const role = auth.currentRole();
    const hasUser = !!auth.currentUser();

    if (hasUser && role && allowedRoles.includes(role)) {
      return true;
    }

    await router.navigateByUrl('/');
    return false;
  };
}




