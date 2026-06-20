import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    imports: [
    NavbarComponent,
    HomeComponent,
    RouterOutlet
  ]
})

export class AppComponent {
  title = 'comptask';
}
