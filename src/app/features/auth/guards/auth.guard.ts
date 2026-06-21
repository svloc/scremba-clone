import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import type { UserRole } from '../../../core/auth/auth.models';

export function authGuard(allowedRoles: UserRole[] = ['student', 'admin']): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const role = auth.currentRole();
    const hasUser = !!auth.currentUser();

    if (hasUser && role && allowedRoles.includes(role)) return true;

    router.navigateByUrl('/');
    return false;
  };
}



