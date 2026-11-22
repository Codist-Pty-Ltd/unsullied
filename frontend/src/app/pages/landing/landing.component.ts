import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AVAILABLE_SERVICES, QuoteResponse } from '../../models/service.model';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  readonly year = new Date().getFullYear();
  readonly phoneDisplay = '+27 79 914 6248';
  readonly phoneHref = 'tel:+27799146248';
  readonly whatsappHref = 'https://wa.me/27799146248?text=Hi%20Unsullied%2C%20I%27d%20like%20a%20quote.';

  menuOpen = false;
  serviceTab: 'cleaning' | 'pest' = 'cleaning';
  submitting = false;
  error = '';
  submittedQuote: QuoteResponse | null = null;

  name = '';
  email = '';
  phone = '';
  service = '';
  suburb = '';
  date = '';
  contactMethod = 'WhatsApp';
  message = '';

  cleaningServices = [
    {
      title: 'Carpet Cleaning',
      copy: 'Deep cleaning, stain treatment and professional extraction.',
      image: 'assets/home/work/carpet-scrub.jpg',
      catalog: 'Carpet Clean'
    },
    {
      title: 'Couch & Upholstery',
      copy: 'Remove dirt, stains and everyday build-up from soft furnishings.',
      image: 'assets/home/work/couch.jpg',
      catalog: 'Couch Clean'
    },
    {
      title: 'Mattress Cleaning',
      copy: 'A fresher, cleaner sleeping environment with deep extraction.',
      image: 'assets/home/mattress.jpg',
      catalog: 'Mattress Clean'
    },
    {
      title: 'Water Extraction',
      copy: 'Professional extraction for excess water in affected areas.',
      image: 'assets/home/work/rug-extract.jpg',
      catalog: 'Water Extraction'
    }
  ];

  pestServices = [
    {
      title: 'Cockroach Control',
      copy: 'Inspection and targeted treatment that clears a cockroach infestation at the source.',
      image: 'assets/home/pest/cockroach.jpg',
      catalog: 'Cockroach Control'
    },
    {
      title: 'Rodent Management',
      copy: 'Inspection, control and prevention for rats and mice in homes and businesses.',
      image: 'assets/home/pest/rodent.jpg',
      catalog: 'Rodent Management'
    },
    {
      title: 'Termite Treatment',
      copy: 'Inspection and treatment to protect timber and the structure of the property.',
      image: 'assets/home/pest/termite.jpg',
      catalog: 'Termite Treatment'
    },
    {
      title: 'Ant Control',
      copy: 'Treatment aimed at the colony and the places ants are nesting.',
      image: 'assets/home/pest/ants.jpg',
      catalog: 'Ant Control'
    },
    {
      title: 'Bed Bug Treatment',
      copy: 'Discreet treatment of bedding, furniture and the surrounding area.',
      image: 'assets/home/pest/bedbugs.jpg',
      catalog: 'Bed Bug Treatment'
    },
    {
      title: 'General Pest Control',
      copy: 'One visit for crawling insects such as spiders, fleas and silverfish.',
      image: 'assets/home/work/pest.jpg',
      catalog: 'General Pest Control'
    }
  ];

  jobClips = [
    {
      title: 'Carpet scrubbing',
      src: 'assets/home/work/carpet-scrub.mp4',
      poster: 'assets/home/work/carpet-scrub-poster.jpg'
    },
    {
      title: 'Carpet extraction',
      src: 'assets/home/work/carpet-extract.mp4',
      poster: 'assets/home/work/carpet-extract.jpg'
    },
    {
      title: 'Couch cleaning',
      src: 'assets/home/work/couch.mp4',
      poster: 'assets/home/work/couch-poster.jpg'
    },
    {
      title: 'Pest treatment',
      src: 'assets/home/work/pest.mp4',
      poster: 'assets/home/work/pest-poster.jpg'
    }
  ];

  jobPhotos = [
    { src: 'assets/home/work/team.jpg', alt: 'Unsullied team setting up a lounge clean' },
    { src: 'assets/home/work/carpet-scrub.jpg', alt: 'Rotary machine scrubbing a carpet' },
    { src: 'assets/home/work/carpet-detail.jpg', alt: 'Carpet shampoo lifted by a rotary cleaner' },
    { src: 'assets/home/work/rug-extract.jpg', alt: 'Extracting water from an outdoor rug' },
    { src: 'assets/home/work/outdoor-machine.jpg', alt: 'Rotary cleaner working a rug on brick paving' },
    { src: 'assets/home/work/couch-machine.jpg', alt: 'Cleaning machine beside an armchair' }
  ];

  constructor(
    private quoteService: QuoteService,
    private router: Router
  ) {
    const hash = window.location.hash;
    if (hash === '#pest-control' || hash === '#services') {
      this.serviceTab = 'pest';
    }
  }

  openServiceTab(tab: 'cleaning' | 'pest', event: Event): void {
    event.preventDefault();
    this.serviceTab = tab;
    this.closeMenu();
    history.replaceState(null, '', tab === 'cleaning' ? '#cleaning' : '#pest-control');
    this.scrollToId('services');
  }

  scrollTo(id: string, event?: Event): void {
    event?.preventDefault();
    this.closeMenu();
    this.scrollToId(id);
    history.replaceState(null, '', `#${id}`);
  }

  private scrollToId(id: string): void {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    const top = target.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  chooseService(catalog: string): void {
    this.service = catalog;
    this.submittedQuote = null;
    this.error = '';
  }

  get minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  submitEnquiry(): void {
    this.error = '';
    if (this.service === 'Water Extraction' || this.service === 'Other') {
      this.router.navigate(['/quote'], { queryParams: this.quoteParams() });
      return;
    }

    const catalog = AVAILABLE_SERVICES.find(service => service.name === this.service);
    if (!catalog) {
      this.error = 'Choose a service so we can price the visit.';
      return;
    }

    this.submitting = true;
    this.quoteService.createQuote({
      customerName: this.name.trim(),
      email: this.email.trim(),
      address: this.suburb.trim(),
      addressType: 'house',
      services: [{ ...catalog, quantity: 1 }],
      preferredDate: this.date || undefined,
      specialInstructions: this.instructions(),
      status: 'pending'
    }).subscribe({
      next: (response) => {
        this.submittedQuote = response;
        this.submitting = false;
      },
      error: (err) => {
        this.submitting = false;
        this.error = err?.error?.error || 'Could not save your quote. Please try again or WhatsApp us.';
      }
    });
  }

  continueInQuote(): void {
    this.router.navigate(['/quote'], { queryParams: this.quoteParams() });
  }

  private quoteParams(): Record<string, string> {
    const params: Record<string, string> = {
      name: this.name.trim(),
      email: this.email.trim(),
      address: this.suburb.trim(),
      phone: this.phone.trim(),
      notes: this.instructions()
    };
    if (this.date) {
      params['date'] = this.date;
    }
    if (this.service && this.service !== 'Water Extraction' && this.service !== 'Other') {
      params['service'] = this.service;
    }
    return params;
  }

  private instructions(): string {
    const lines = [
      this.phone.trim() ? `Phone: ${this.phone.trim()}` : '',
      `Preferred contact: ${this.contactMethod}`,
      this.service === 'Water Extraction' || this.service === 'Other'
        ? `Service requested: ${this.service}`
        : '',
      this.message.trim()
    ];
    return lines.filter(Boolean).join('\n');
  }
}
