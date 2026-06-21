import type { AuthSession, UserRole } from './auth.models';

const STORAGE_KEYS = {
  session: 'auth.session',
  rememberMe: 'auth.rememberMe'
} as const;

export type StorageKind = 'localStorage' | 'sessionStorage';

export function getStorage(kind: StorageKind): Storage {
  return kind === 'localStorage' ? window.localStorage : window.sessionStorage;
}

export function readRememberMe(): boolean {
  const raw = window.localStorage.getItem(STORAGE_KEYS.rememberMe);
  return raw === 'true';
}

export function writeRememberMe(rememberMe: boolean): void {
  window.localStorage.setItem(STORAGE_KEYS.rememberMe, String(rememberMe));
}

export function persistSession(session: AuthSession, kind: StorageKind): void {
  getStorage(kind).setItem(STORAGE_KEYS.session, JSON.stringify(session));
}

export function readSession(): AuthSession | null {
  // Prefer localStorage if rememberMe=true, otherwise use sessionStorage.
  const rememberMe = readRememberMe();
  const kind: StorageKind = rememberMe ? 'localStorage' : 'sessionStorage';
  const raw = getStorage(kind).getItem(STORAGE_KEYS.session);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  window.localStorage.removeItem(STORAGE_KEYS.session);
  window.sessionStorage.removeItem(STORAGE_KEYS.session);
}

export function sessionRoleAllows(session: AuthSession | null, allowedRoles: UserRole[]): boolean {
  if (!session) return false;
  return allowedRoles.includes(session.role);
}

