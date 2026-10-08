import { TestBed } from '@angular/core/testing';
import { App } from '../../../app';
import { BOOKING_CONFIG, bookingConfig } from '../../config/booking.config';
import { WhatsAppFloatingButtonComponent } from './whatsapp-floating-button';

describe('Floating WhatsApp integration', () => {
  it('renders once alongside all page sections with the configured encoded URL', async () => {
    // Synthetic fixture only: no browser tab or real contact is opened.
    const number = '1234567';
    const message = 'Hola, ¿disponibilidad & precios?';
    TestBed.configureTestingModule({
      imports: [App],
      providers: [{
        provide: BOOKING_CONFIG,
        useValue: { ...bookingConfig, whatsappNumber: number, defaultMessage: message },
      }],
    });
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('app-whatsapp-floating-button').length).toBe(1);
    const link = page.querySelector<HTMLAnchorElement>('.floating-whatsapp')!;
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe('https://wa.me/' + number + '?text=' + encodeURIComponent(message));
    expect(link.target).toBe('_blank');
    expect(link.rel).toBe('noopener noreferrer');
    expect(link.getAttribute('aria-label')).toContain('WhatsApp');
    for (const selector of ['app-header', 'app-hero', 'app-services', 'app-portfolio', 'app-about', 'app-contact', 'app-footer']) {
      expect(page.querySelectorAll(selector).length).toBe(1);
    }
    // Contact remains on the same page without suppressing the floating action.
    page.querySelector<HTMLElement>('#contact-name')!.focus();
    await fixture.whenStable();
    expect(page.querySelector('.floating-whatsapp')).toBe(link);
  });

  it('shows an informational button for malformed configuration', async () => {
    TestBed.configureTestingModule({
      providers: [{
        provide: BOOKING_CONFIG,
        useValue: { ...bookingConfig, whatsappNumber: 'not-configured' },
      }],
    });
    const fixture = TestBed.createComponent(WhatsAppFloatingButtonComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('a')).toBeNull();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const notice = fixture.nativeElement.querySelector('#whatsapp-notice') as HTMLElement;
    expect(button.disabled).toBe(false);
    expect(notice.hidden).toBe(true);
    button.focus();
    button.click();
    await fixture.whenStable();
    expect(notice.hidden).toBe(false);
    expect(notice.textContent).toContain('WhatsApp todavía no está disponible');
    expect(button.getAttribute('aria-expanded')).toBe('true');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(notice.hidden).toBe(true);
    expect(document.activeElement).toBe(button);
  });

  it('always renders a button and local icon without a number', async () => {
    const fixture = TestBed.createComponent(WhatsAppFloatingButtonComponent);
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button).not.toBeNull();
    expect(button.querySelector('img')?.getAttribute('src')).toBe('icons/whatsapp.svg');
    button.click();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[role="status"]').hidden).toBe(false);
    button.click();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[role="status"]').hidden).toBe(true);
  });
});
