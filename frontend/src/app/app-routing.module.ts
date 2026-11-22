import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { QuoteFormComponent } from './pages/quote-form/quote-form.component';
import { AdminQuotesComponent } from './pages/admin-quotes/admin-quotes.component';
import { AdminCalendarComponent } from './pages/admin-calendar/admin-calendar.component';
import { JobCardComponent } from './pages/job-card/job-card.component';
import { PaymentReturnComponent } from './pages/payment-return/payment-return.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminGuard } from './guards/admin.guard';
import { PublicPageComponent } from './pages/public-page/public-page.component';
import { PUBLIC_PAGES } from './content/public-pages';

const noindex = 'noindex, nofollow';
const homeDescription = 'Unsullied cleans carpets, couches and mattresses, extracts water, and treats pests for homes and businesses across Gauteng. Request a quote online.';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: {
      title: 'Cleaning & Pest Control Gauteng | Unsullied',
      description: homeDescription
    }
  },
  {
    path: 'cleaning',
    component: PublicPageComponent,
    data: {
      title: 'Carpet, Couch & Mattress Cleaning Gauteng | Unsullied',
      description: 'Carpet, couch and mattress cleaning plus water extraction across Gauteng. See starting prices and request a quote from Unsullied.',
      page: PUBLIC_PAGES['cleaning']
    }
  },
  {
    path: 'pest-control',
    component: PublicPageComponent,
    data: {
      title: 'Pest Control Gauteng | Unsullied',
      description: 'Cockroach, rodent, termite, ant, bed bug and general pest control across Gauteng. See starting prices and request a quote.',
      page: PUBLIC_PAGES['pest']
    }
  },
  {
    path: 'about',
    component: PublicPageComponent,
    data: {
      title: 'About Unsullied | Cleaning & Pest Control Gauteng',
      description: 'Unsullied is a Gauteng cleaning and pest control business. Phone +27 79 914 6248 or email sales@unsullied.co.za.',
      page: PUBLIC_PAGES['about']
    }
  },
  {
    path: 'privacy',
    component: PublicPageComponent,
    data: {
      title: 'Privacy Notice | Unsullied',
      description: 'How Unsullied uses quote details under POPIA, and how to ask for a correction or deletion.',
      page: PUBLIC_PAGES['privacy']
    }
  },
  {
    path: 'terms',
    component: PublicPageComponent,
    data: {
      title: 'Quote and Service Terms | Unsullied',
      description: 'How Unsullied quotes work, including the R300 call-out fee and when a visit is confirmed.',
      page: PUBLIC_PAGES['terms']
    }
  },
  {
    path: 'quote',
    component: QuoteFormComponent,
    data: {
      title: 'Request a Cleaning or Pest Control Quote | Unsullied',
      description: 'Tell Unsullied the service, suburb and preferred date. The quote includes the service price and a R300 call-out fee.'
    }
  },
  { path: 'admin/login', component: AdminLoginComponent, data: { title: 'Admin sign in | Unsullied', robots: noindex } },
  { path: 'admin/quotes', component: AdminQuotesComponent, canActivate: [AdminGuard], data: { title: 'Admin | Unsullied', robots: noindex } },
  { path: 'admin/calendar', component: AdminCalendarComponent, canActivate: [AdminGuard], data: { title: 'Calendar | Unsullied', robots: noindex } },
  { path: 'job-card/:id', component: JobCardComponent, canActivate: [AdminGuard], data: { title: 'Job card | Unsullied', robots: noindex } },
  { path: 'payment-return', component: PaymentReturnComponent, data: { title: 'Payment | Unsullied', robots: noindex } },
  { path: '**', component: PublicPageComponent, data: { title: 'Page not found | Unsullied', robots: noindex, page: PUBLIC_PAGES['missing'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
