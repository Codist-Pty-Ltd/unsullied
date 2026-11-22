import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen flex flex-col" [class.bg-gray-50]="!isHome" [class.bg-white]="isHome">
      <header
        *ngIf="!isHome"
        class="sticky top-0 z-50 border-b border-[#dce6ee] bg-white/95 backdrop-blur-xl"
      >
        <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a routerLink="/" class="flex items-center">
            <img src="assets/home/logo-header.svg" alt="Unsullied" class="h-12 w-auto" />
          </a>
          <nav class="flex items-center gap-1">
            <a
              routerLink="/quote"
              routerLinkActive="bg-primary-100 text-primary-900 font-semibold"
              [routerLinkActiveOptions]="{ exact: true }"
              class="rounded-lg px-3 py-1.5 text-sm font-medium text-[#13294e] hover:bg-primary-50"
            >Quote</a>
            <a
              routerLink="/admin/quotes"
              routerLinkActive="bg-primary-100 text-primary-900 font-semibold"
              class="rounded-lg px-3 py-1.5 text-sm font-medium text-[#13294e] hover:bg-primary-50"
            >Admin</a>
            <a
              routerLink="/admin/calendar"
              routerLinkActive="bg-primary-100 text-primary-900 font-semibold"
              class="rounded-lg px-3 py-1.5 text-sm font-medium text-[#13294e] hover:bg-primary-50"
            >Calendar</a>
            <button
              *ngIf="auth.loggedIn"
              type="button"
              (click)="logout()"
              class="rounded-lg px-3 py-1.5 text-sm font-medium text-[#13294e] hover:bg-primary-50"
            >Log out</button>
          </nav>
        </div>
      </header>
      <main class="flex-1" [class.mx-auto]="!isHome" [class.w-full]="!isHome" [class.max-w-6xl]="!isHome" [class.px-4]="!isHome" [class.py-8]="!isHome" [class.sm:px-6]="!isHome">
        <router-outlet></router-outlet>
      </main>
      <footer *ngIf="!isHome" class="mt-auto border-t border-[#dce6ee] bg-[#13294e] text-sm text-[#caedff]">
        <div class="mx-auto max-w-6xl px-4 py-6 text-center sm:px-6">
          <p>&copy; 2026 Unsullied. <a class="underline" routerLink="/privacy">Privacy</a> · <a class="underline" routerLink="/terms">Terms</a> · <a class="underline" href="mailto:sales@unsullied.co.za">sales@unsullied.co.za</a> · +27 79 914 6248</p>
        </div>
      </footer>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Unsullied';
  isHome = true;

  constructor(private router: Router, public auth: AuthService, private seo: SeoService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.applyRoute(event.urlAfterRedirects);
      }
    });
    this.applyRoute(this.router.url);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }

  private applyRoute(url: string): void {
    const path = url.split('?')[0].split('#')[0] || '/';
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.isHome = ['/', '/cleaning', '/pest-control', '/about', '/privacy', '/terms'].includes(path) || !!route.data['page'];
    this.seo.apply(path, route.data);
  }
}
