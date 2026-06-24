import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="auth-wrap">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h1 class="h4 mb-3">Log in</h1>

          <form (ngSubmit)="onSubmit()" #f="ngForm" class="d-flex flex-column gap-3">
            <div class="mb-1">
              <label class="form-label" for="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                class="form-control"
                required
                [(ngModel)]="email" />
            </div>

            <div class="mb-1">
              <label class="form-label" for="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                class="form-control"
                required
                [(ngModel)]="password" />
            </div>

            <div class="form-check mt-1">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                class="form-check-input"
                [(ngModel)]="rememberMe" />
              <label class="form-check-label" for="remember">Remember me</label>
            </div>

            <button type="submit" class="btn btn-primary w-100" [disabled]="loading">
              {{ loading ? 'Signing in…' : 'Sign in' }}
            </button>

            <p class="error mb-0" *ngIf="error()" aria-live="polite">{{ error() }}</p>

            <div class="links d-flex justify-content-between mt-2 small">
              <a class="link-secondary text-decoration-none" routerLink="/register">Create account</a>
              <a class="link-secondary text-decoration-none" routerLink="/forgot-password">Forgot password</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Kept minimal: align brand color and card outer margins with prior styling */
    .auth-wrap{max-width:420px;margin:40px auto;}
    button.btn{background:#e84c8a;color:white;font-weight:700;border-radius:12px;}
    button.btn:disabled{opacity:.6;cursor:not-allowed}
    .error{color:#b00020;font-weight:600}
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = true;
  loading = false;
  error = signal<string>('');

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  async onSubmit(): Promise<void> {
    this.loading = true;
    this.error.set('');

    const res = await this.auth.login(
      { email: this.email.trim(), password: this.password },
      { rememberMe: this.rememberMe }
    );

    this.loading = false;

    if (!res.ok) {
      this.error.set(res.error);
      return;
    }

    const role = this.auth.currentRole();
    await this.router.navigateByUrl(role === 'admin' ? '/admin' : '/dashboard');
  }
}

