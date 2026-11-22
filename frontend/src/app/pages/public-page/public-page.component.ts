import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicPage } from '../../content/public-pages';

@Component({
  selector: 'app-public-page',
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.css']
})
export class PublicPageComponent {
  readonly year = new Date().getFullYear();
  page: PublicPage = {
    eyebrow: '',
    headline: '',
    lead: ''
  };
  readonly phoneHref = 'tel:+27799146248';
  readonly whatsappHref = 'https://wa.me/27799146248?text=Hi%20Unsullied%2C%20I%27d%20like%20a%20quote.';

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.page = data['page'];
    });
  }

  quoteLink(service?: string): string[] {
    return ['/quote'];
  }

  quoteQuery(service?: string): Record<string, string> | null {
    return service ? { service } : null;
  }
}
