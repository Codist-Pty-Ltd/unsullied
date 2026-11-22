import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuoteFormComponent } from './pages/quote-form/quote-form.component';
import { ServiceSelectorComponent } from './components/service-selector/service-selector.component';
import { AdminQuotesComponent } from './pages/admin-quotes/admin-quotes.component';
import { AdminCalendarComponent } from './pages/admin-calendar/admin-calendar.component';
import { JobCardComponent } from './pages/job-card/job-card.component';
import { PaymentReturnComponent } from './pages/payment-return/payment-return.component';
import { SignaturePadComponent } from './components/signature-pad/signature-pad.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { PublicPageComponent } from './pages/public-page/public-page.component';

@NgModule({
  declarations: [
    AppComponent,
    QuoteFormComponent,
    ServiceSelectorComponent,
    AdminQuotesComponent,
    AdminCalendarComponent,
    JobCardComponent,
    PaymentReturnComponent,
    SignaturePadComponent,
    LandingComponent,
    AdminLoginComponent,
    PublicPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
