import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Data } from '@angular/router';

const SITE = 'https://unsullied.co.za';
const DEFAULT_TITLE = 'Cleaning & Pest Control Gauteng | Unsullied';
const DEFAULT_DESCRIPTION = 'Unsullied cleans carpets, couches and mattresses, extracts water, and treats pests for homes and businesses across Gauteng. Request a quote online.';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  apply(path: string, data: Data): void {
    const pageTitle = data['title'] || DEFAULT_TITLE;
    const description = data['description'] || DEFAULT_DESCRIPTION;
    const robots = data['robots'] || 'index, follow';
    const canonicalPath = path === '/' ? '/' : path;
    const url = `${SITE}${canonicalPath}`;

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: `${SITE}/assets/home/work/team.jpg` });
    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
