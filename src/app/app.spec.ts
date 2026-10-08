import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Resalta tu belleza natural');
  });

  it('keeps a single H1, unique IDs, descriptive image alternatives and safe external links', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('h1').length).toBe(1);
    const ids = Array.from(page.querySelectorAll('[id]'), element => element.id);
    expect(new Set(ids).size).toBe(ids.length);
    page.querySelectorAll<HTMLImageElement>('img').forEach(image => {
      expect(image.hasAttribute('alt')).toBe(true);
      if (image.getAttribute('aria-hidden') !== 'true') expect(image.alt.trim().length).toBeGreaterThan(0);
      expect(image.getAttribute('width')).not.toBeNull();
      expect(image.getAttribute('height')).not.toBeNull();
    });
    expect(page.querySelector('.hero img')?.getAttribute('fetchpriority')).toBe('high');
    expect(page.querySelector('.hero img')?.getAttribute('loading')).toBe('eager');
    page.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]').forEach(link => {
      expect(link.relList.contains('noopener')).toBe(true);
      expect(link.relList.contains('noreferrer')).toBe(true);
    });
  });

  it('opens the mobile navigation and closes it with Escape, restoring focus', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const toggle = page.querySelector<HTMLButtonElement>('.menu-toggle')!;
    toggle.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(page.querySelector('nav')?.classList.contains('is-open')).toBe(true);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });

  it('closes navigation on selection and provides every fragment target', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const toggle = page.querySelector<HTMLButtonElement>('.menu-toggle')!;
    toggle.click();
    await fixture.whenStable();
    page.querySelector<HTMLAnchorElement>('nav a')!.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    page.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
      expect(page.querySelector(link.getAttribute('href')!)).not.toBeNull();
    });
  });

  it('does not open a fictitious WhatsApp number while configuration is pending', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('a[href*="wa.me"]')).toBeNull();
    expect(page.querySelector<HTMLButtonElement>('.booking')?.disabled).toBe(true);
    expect(page.querySelector<HTMLButtonElement>('.hero .button')?.disabled).toBe(true);
  });

  it('renders four services beneath the Hero with a unique navigation target', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('#servicios').length).toBe(1);
    expect(page.querySelector('app-hero')?.nextElementSibling?.tagName).toBe('APP-SERVICES');
    const cards = page.querySelectorAll('app-service-card');
    expect(cards.length).toBe(4);
    expect(Array.from(cards, card => card.querySelector('h3')?.textContent)).toEqual([
      'Maquillaje Social', 'Maquillaje de Novia', 'Maquillaje de Fiesta', 'Asesoría Personalizada',
    ]);
    cards.forEach(card => {
      const image = card.querySelector('img')!;
      expect(image.loading || image.getAttribute('loading')).toBe('lazy');
      expect(image.alt.length).toBeGreaterThan(10);
      expect(card.querySelector<HTMLButtonElement>('button')?.disabled).toBe(true);
    });
  });

  it('integrates the portfolio beneath services with a unique Header anchor', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('app-services')?.nextElementSibling?.tagName).toBe('APP-PORTFOLIO');
    expect(page.querySelectorAll('#portafolio').length).toBe(1);
    expect(page.querySelector('nav a[href="#portafolio"]')).not.toBeNull();
    expect(page.querySelectorAll('.gallery__card').length).toBe(6);
  });

  it('integrates About, Contact and Footer with unique anchors and no invented social links', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('app-portfolio')?.nextElementSibling?.tagName).toBe('APP-ABOUT');
    expect(page.querySelector('app-about')?.nextElementSibling?.tagName).toBe('APP-CONTACT');
    for (const id of ['sobre-mi', 'contacto']) expect(page.querySelectorAll('#' + id).length).toBe(1);
    expect(page.querySelectorAll('footer').length).toBe(1);
    expect(page.querySelector('footer')?.textContent).toContain(String(new Date().getFullYear()));
    expect(page.querySelector('footer a[target="_blank"]')).toBeNull();
    expect(page.querySelectorAll('app-whatsapp-floating-button').length).toBe(1);
  });
});
