import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, readAdminToken } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html'
})
export class AdminLoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';
  isSubmitting = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (readAdminToken()) {
      this.router.navigateByUrl(this.safeReturnUrl());
    }
  }

  submit(): void {
    this.error = '';
    if (!this.email.trim() || !this.password) {
      this.error = 'Enter the email and password.';
      return;
    }

    this.isSubmitting = true;
    this.auth.login(this.email.trim(), this.password).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.password = '';
        this.router.navigateByUrl(this.safeReturnUrl());
      },
      error: (err) => {
        this.isSubmitting = false;
        this.error = err.error?.error || 'Could not sign in. Please try again.';
      }
    });
  }

  private safeReturnUrl(): string {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/admin/quotes';
    if (returnUrl.startsWith('/') && !returnUrl.startsWith('//') && !returnUrl.startsWith('/admin/login')) {
      return returnUrl;
    }
    return '/admin/quotes';
  }
}
