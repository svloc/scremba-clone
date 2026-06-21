import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  readonly currentUser = computed(() => this.auth.currentUser());
  readonly currentRole = computed(() => this.auth.currentRole());

  constructor(private readonly auth: AuthService) {
    this.auth.hydrateFromStorage();
  }
}



