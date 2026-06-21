import type { AuthUser, UserRole } from '../../core/auth/auth.models';

export interface UserEntity {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
}

export type UserSession = {
  userId: string;
  role: UserRole;
  email: string;
  issuedAt: string;
};

export function userFromAuthUser(user: AuthUser): UserEntity {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    avatarUrl: user.avatarUrl
  };
}

