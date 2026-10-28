import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a routerLink="/home" class="btn primary">Go Home</a>
    </div>
  `,
  styles: [`
    .not-found { text-align: center; padding: 4rem 1rem; }
    h2 { color: #e53935; margin-bottom: 1rem; }
    p { margin-bottom: 2rem; color: #555; }
  `]
})
export class NotFound {}
