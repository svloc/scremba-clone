import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="auth-wrap">
      <h1>Logging out…</h1>
      <p>Clearing session.</p>
    </section>
  `,
  styles: [`
    .auth-wrap{max-width:420px;margin:40px auto;padding:24px;border:1px solid rgba(0,0,0,.08);border-radius:12px}
    h1{font-size:24px;margin-bottom:10px}
  `]
})
export class LogoutComponent {
  constructor(private readonly auth: AuthService, private readonly router: Router) {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}

