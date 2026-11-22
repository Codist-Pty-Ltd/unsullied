export interface Offer {
  title: string;
  copy: string;
  price: string;
  service?: string;
}

export interface CopyBlock {
  heading: string;
  paragraphs: string[];
}

export interface PublicPage {
  eyebrow: string;
  headline: string;
  lead: string;
  offers?: Offer[];
  blocks?: CopyBlock[];
}

export const PUBLIC_PAGES: Record<string, PublicPage> = {
  cleaning: {
    eyebrow: 'Cleaning',
    headline: 'Carpet, couch and mattress cleaning in Gauteng',
    lead: 'Unsullied deep-cleans carpets, upholstery and mattresses, and extracts standing water. Prices below are starting prices for one item. A R300 call-out fee is added to every visit.',
    offers: [
      { title: 'Carpet cleaning', copy: 'Rotary scrubbing, stain treatment and hot-water extraction for wall-to-wall carpets and rugs.', price: 'From R180', service: 'Carpet Clean' },
      { title: 'Couch and upholstery', copy: 'Dirt and everyday stains lifted from fabric couches and armchairs.', price: 'From R200', service: 'Couch Clean' },
      { title: 'Mattress cleaning', copy: 'Deep extraction for a fresher sleeping surface.', price: 'From R150', service: 'Mattress Clean' },
      { title: 'Water extraction', copy: 'Standing water pulled from carpets, rugs and affected floors. The price depends on the area.', price: 'Quoted for the job' }
    ]
  },
  pest: {
    eyebrow: 'Pest control',
    headline: 'Pest control for homes and businesses in Gauteng',
    lead: 'Unsullied inspects the property and treats the pest you actually have. Prices below are starting prices. A R300 call-out fee is added to every visit.',
    offers: [
      { title: 'Cockroach control', copy: 'Inspection and a targeted treatment for a cockroach infestation.', price: 'From R250', service: 'Cockroach Control' },
      { title: 'Rodent management', copy: 'Inspection, control and prevention for rats and mice.', price: 'From R280', service: 'Rodent Management' },
      { title: 'Termite treatment', copy: 'Inspection and treatment to protect timber and the structure.', price: 'From R400', service: 'Termite Treatment' },
      { title: 'Ant control', copy: 'Treatment aimed at the colony and the nesting sites.', price: 'From R200', service: 'Ant Control' },
      { title: 'Bed bug treatment', copy: 'Treatment of bedding, furniture and the surrounding area.', price: 'From R350', service: 'Bed Bug Treatment' },
      { title: 'General pest control', copy: 'One visit for crawling insects such as spiders, fleas and silverfish.', price: 'From R350', service: 'General Pest Control' }
    ]
  },
  about: {
    eyebrow: 'About',
    headline: 'Unsullied cleaning and pest control',
    lead: 'Unsullied is a Gauteng cleaning and pest control business. The same team handles the soft furnishings in a home and the pests that make that home uncomfortable.',
    blocks: [
      {
        heading: 'What we do',
        paragraphs: [
          'Cleaning covers carpets, couches, mattresses and water extraction. Pest control covers cockroaches, rodents, termites, ants, bed bugs and general crawling insects.',
          'You send a quote request with the service, the suburb and a preferred date. We save it, price the first service plus the R300 call-out, and confirm the visit with you by WhatsApp, phone or email.'
        ]
      },
      {
        heading: 'How to reach us',
        paragraphs: [
          'Phone and WhatsApp: +27 79 914 6248. Email: sales@unsullied.co.za. We work across Gauteng.'
        ]
      }
    ]
  },
  privacy: {
    eyebrow: 'Privacy',
    headline: 'Privacy notice',
    lead: 'This notice explains what Unsullied collects when you ask for a quote, why we keep it, and how to ask for a copy or a correction. It is written for the Protection of Personal Information Act (POPIA).',
    blocks: [
      {
        heading: 'Who is responsible',
        paragraphs: [
          'Unsullied is the responsible party for quote and booking information. Contact sales@unsullied.co.za or +27 79 914 6248.'
        ]
      },
      {
        heading: 'What we collect',
        paragraphs: [
          'When you request a quote we ask for your name, email, phone number, suburb or address, the service you want, a preferred date, and any notes you type. If a job is completed we may also keep the visit status and whether it was paid.',
          'We do not ask for your card number on this website. If you pay online, the payment provider processes the card and we only store the payment result.'
        ]
      },
      {
        heading: 'Why we use it',
        paragraphs: [
          'We use this information to price the visit, contact you, schedule the team, and keep a record of the job. We do not sell personal information.',
          'The public website does not set advertising or analytics cookies. Staff sign-in is stored only in that staff member’s browser.'
        ]
      },
      {
        heading: 'How long we keep it',
        paragraphs: [
          'We keep quote and job records for as long as we need them to complete the work, answer a query, and meet ordinary business record-keeping. You can ask us to correct or delete your details by emailing sales@unsullied.co.za. We will delete them unless we still need the record for a booking in progress or a legal duty.'
        ]
      }
    ]
  },
  missing: {
    eyebrow: 'Page not found',
    headline: 'That page is not on this site',
    lead: 'The address does not match a page. You can go back to the homepage or request a quote.',
    blocks: []
  },
  terms: {
    eyebrow: 'Terms',
    headline: 'Quote and service terms',
    lead: 'These terms cover quote requests made on unsullied.co.za. Asking for a quote does not by itself book the visit.',
    blocks: [
      {
        heading: 'Quotes',
        paragraphs: [
          'Prices shown on the site are starting prices for the quantity you enter. A call-out fee of R300 is added to the service price. If the job is larger than the description, or access is different from what was described, we will tell you before the extra work goes ahead.',
          'A quote stays pending until Unsullied confirms the date. Weekend appointments are available when the team has space.'
        ]
      },
      {
        heading: 'The visit',
        paragraphs: [
          'We work across Gauteng. Please give a contact number that reaches you on the day, and safe access to the rooms or the area being treated.',
          'Water extraction and any request marked Other are priced after we understand the size of the job. They are not given a fixed unit price on the form.'
        ]
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Questions about a quote: sales@unsullied.co.za or +27 79 914 6248.'
        ]
      }
    ]
  }
};
