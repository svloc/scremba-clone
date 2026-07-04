import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavbarComponent, RouterOutlet]
})
export class AppComponent {
fireflies = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x1: this.random(-45, 45),
  y1: this.random(-45, 45),
  x2: this.random(-45, 45),
  y2: this.random(-45, 45),
  scale1: this.random(0.3, 1),
  scale2: this.random(0.3, 1),
  duration: this.random(15, 35),
  rotate: this.random(6, 15),
  flash: this.random(4, 8),
  delay: this.random(0, 8)
}));

  private random(min: number, max: number): number {
    return +(Math.random() * (max - min) + min).toFixed(2);
  }
}

