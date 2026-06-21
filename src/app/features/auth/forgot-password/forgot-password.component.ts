import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="auth-wrap">
      <h1>Forgot password</h1>
      <p class="sub">This is a mock flow. No email is actually sent.</p>
      <form (ngSubmit)="onSubmit()">
        <label>
          <span>Email</span>
          <input name="email" type="email" required [(ngModel)]="email" />
        </label>
        <button type="submit">Send reset link (mock)</button>
        <p class="success" *ngIf="done">Reset link sent to {{ email }}</p>
      </form>
    </section>
  `,
  styles: [`
    .auth-wrap{max-width:420px;margin:40px auto;padding:24px;border:1px solid rgba(0,0,0,.08);border-radius:12px}
    h1{font-size:24px;margin-bottom:10px}
    .sub{color:rgba(0,0,0,.65);margin-bottom:18px}
    form{display:flex;flex-direction:column;gap:14px}
    label{display:flex;flex-direction:column;gap:8px;font-size:14px}
    input{padding:10px 12px;border-radius:10px;border:1px solid rgba(0,0,0,.15)}
    button{padding:12px 14px;border-radius:12px;border:0;background:#4a4e74;color:white;font-weight:700;cursor:pointer}
    .success{color:#0b6b3a;font-weight:700}
  `]
})
export class ForgotPasswordComponent {
  email = '';
  done = false;

  onSubmit(): void {
    this.done = true;
  }
}

