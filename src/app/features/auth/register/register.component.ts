import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="auth-wrap">
      <h1>Create account</h1>
      <form (ngSubmit)="onSubmit()">
        <label>
          <span>First name</span>
          <input name="firstName" type="text" required [(ngModel)]="firstName" />
        </label>

        <label>
          <span>Last name</span>
          <input name="lastName" type="text" required [(ngModel)]="lastName" />
        </label>

        <label>
          <span>Email</span>
          <input name="email" type="email" required [(ngModel)]="email" />
        </label>

        <label>
          <span>Password</span>
          <input name="password" type="password" required [(ngModel)]="password" />
        </label>

        <label class="remember">
          <input name="remember" type="checkbox" [(ngModel)]="rememberMe" />
          <span>Remember me</span>
        </label>

        <button type="submit" [disabled]="loading">{{ loading ? 'Creating…' : 'Create account' }}</button>
        <p class="error" *ngIf="error()">{{ error() }}</p>

        <div class="links">
          <a routerLink="/login">Back to login</a>
        </div>
      </form>
    </section>
  `,
  styles: [`
    .auth-wrap{max-width:420px;margin:40px auto;padding:24px;border:1px solid rgba(0,0,0,.08);border-radius:12px}
    h1{font-size:24px;margin-bottom:16px}
    form{display:flex;flex-direction:column;gap:14px}
    label{display:flex;flex-direction:column;gap:8px;font-size:14px}
    input{padding:10px 12px;border-radius:10px;border:1px solid rgba(0,0,0,.15)}
    button{padding:12px 14px;border-radius:12px;border:0;background:#e84c8a;color:white;font-weight:700;cursor:pointer}
    button:disabled{opacity:.6;cursor:not-allowed}
    .remember{flex-direction:row;align-items:center}
    .remember span{margin-left:8px}
    .error{color:#b00020;font-weight:600}
    .links{display:flex;justify-content:space-between;font-size:13px;margin-top:10px}
    .links a{color:#4a4e74;text-decoration:none}
  `]
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  rememberMe = true;

  loading = false;
  error = signal<string>('');

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  async onSubmit(): Promise<void> {
    this.loading = true;
    this.error.set('');

    const res = await this.auth.register(
      {
        email: this.email.trim(),
        password: this.password,
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim()
      },
      { rememberMe: this.rememberMe }
    );

    this.loading = false;

    if (!res.ok) {
      this.error.set(res.error);
      return;
    }

    await this.router.navigateByUrl('/dashboard');
  }
}

