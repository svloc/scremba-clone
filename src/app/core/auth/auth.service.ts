import { Injectable, computed, signal } from '@angular/core';
import type { AuthSession, AuthUser, LoginRequest, RegisterRequest, UserRole } from './auth.models';
import { persistSession, readSession, clearSession, readRememberMe, writeRememberMe } from './auth-session';

type UserRecord = AuthUser & { password?: string };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _users = signal<UserRecord[]>([]);
  private readonly _session = signal<AuthSession | null>(readSession());

  readonly usersLoaded = computed(() => this._users().length > 0);
  readonly currentUser = computed<AuthUser | null>(() => {
    const session = this._session();
    if (!session) return null;
    const u = this._users().find(x => x.id === session.userId);
    if (!u) return null;
    const { password: _pw, ...user } = u;
    return user;
  });

  readonly currentRole = computed<UserRole | null>(() => this._session()?.role ?? null);

  constructor() {
    // Load users immediately (still purely client-side via assets).
    this.loadUsersOnce();
  }

  private _usersPromise: Promise<void> | null = null;

  private loadUsersOnce(): Promise<void> {
    if (this._usersPromise) return this._usersPromise;

    this._usersPromise = fetch('assets/mock-data/users.json')
      .then(async r => {
        if (!r.ok) throw new Error(`Failed to load users.json: ${r.status}`);
        const data = (await r.json()) as UserRecord[];
        this._users.set(data);
      })
      .catch(err => {
        console.error(err);
        this._users.set([]);
      });

    return this._usersPromise;
  }

  async hydrateFromStorage(): Promise<void> {
    // Ensure users loaded so currentUser can be resolved.
    await this.loadUsersOnce();
    this._session.set(readSession());
  }

  async login({ email, password }: LoginRequest, opts?: { rememberMe?: boolean }): Promise<{ ok: true } | { ok: false; error: string }> {
    await this.loadUsersOnce();

    const user = this._users().find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || !user.password || user.password !== password) {
      return { ok: false, error: 'Invalid email or password.' };
    }

    const session: AuthSession = {
      userId: user.id,
      role: user.role,
      email: user.email,
      issuedAt: new Date().toISOString()
    };

    const rememberMe = opts?.rememberMe ?? readRememberMe();
    writeRememberMe(rememberMe);
    persistSession(session, rememberMe ? 'localStorage' : 'sessionStorage');
    this._session.set(session);

    return { ok: true };
  }

  async register(req: RegisterRequest, opts?: { rememberMe?: boolean }): Promise<{ ok: true; userId: string } | { ok: false; error: string }> {
    await this.loadUsersOnce();

    const exists = this._users().some(u => u.email.toLowerCase() === req.email.toLowerCase());
    if (exists) {
      return { ok: false, error: 'An account with this email already exists.' };
    }

    // Mock registration: persist additional users to localStorage.
    const additionalKey = 'auth.additional-users';
    const additionalRaw = window.localStorage.getItem(additionalKey);
    const additional: Array<UserRecord> = additionalRaw ? (JSON.parse(additionalRaw) as Array<UserRecord>) : [];

    const newUser: UserRecord = {
      id: `u_${Date.now()}`,
      email: req.email,
      password: req.password,
      firstName: req.firstName,
      lastName: req.lastName,
      role: 'student',
      createdAt: new Date().toISOString()
    } as any;

    additional.push(newUser);
    window.localStorage.setItem(additionalKey, JSON.stringify(additional));

    // Update in-memory list and login.
    this._users.set([...this._users(), newUser]);

    const loginRes = await this.login({ email: req.email, password: req.password }, opts);
    if (!loginRes.ok) return { ok: false, error: loginRes.error };

    return { ok: true, userId: newUser.id };
  }

  logout(): void {
    clearSession();
    this._session.set(null);
  }
}

