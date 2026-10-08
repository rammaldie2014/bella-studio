import { TestBed } from '@angular/core/testing';
import { vi, afterEach } from 'vitest';
import { ContactComponent } from './contact';
import { BOOKING_CONFIG, bookingConfig } from '../../../../shared/config/booking.config';
import { WhatsAppFloatingButtonComponent } from '../../../../shared/components/whatsapp-floating-button/whatsapp-floating-button';

describe('ContactComponent', () => {
  afterEach(() => vi.restoreAllMocks());

  async function setup(configured = false) {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [{
        provide: BOOKING_CONFIG,
        // Synthetic fixture, never used in production or opened by these tests.
        useValue: { ...bookingConfig, whatsappNumber: configured ? '1234567' : null },
      }],
    }).compileComponents();
    const fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();
    return fixture;
  }

  it('validates trimmed names, catalog selection and calendar dates', async () => {
    const fixture = await setup(true);
    const form = fixture.componentInstance.form;
    expect(form.invalid).toBe(true);
    form.patchValue({ name: '  ', service: 'novia' });
    expect(form.controls.name.hasError('required')).toBe(true);
    form.controls.name.setValue(' A ');
    expect(form.controls.name.hasError('minlength')).toBe(true);
    form.controls.name.setValue(' María ');
    expect(form.valid).toBe(true);
    for (const date of ['2026-02-30', '2025-02-29', 'not-a-date', '0000-01-01']) {
      form.controls.date.setValue(date);
      expect(form.controls.date.invalid).toBe(true);
    }
    for (const date of ['', '2028-02-29', '2026-12-15']) {
      form.controls.date.setValue(date);
      expect(form.controls.date.valid).toBe(true);
    }
    form.controls.service.setValue('unknown');
    expect(form.controls.service.invalid).toBe(true);
  });

  it('shows accessible errors after fields are touched', async () => {
    const fixture = await setup(true);
    fixture.componentInstance.form.markAllAsTouched();
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('#contact-name')?.getAttribute('aria-describedby')).toBe('name-error');
    expect(page.querySelector('#name-error')?.getAttribute('role')).toBe('alert');
    expect(page.querySelector('#service-error')).not.toBeNull();
    expect(page.querySelectorAll('select option').length).toBe(5);
  });

  it('keeps sending disabled without a number, even with valid fields', async () => {
    const fixture = await setup();
    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    fixture.componentInstance.form.patchValue({ name: 'María', service: 'novia' });
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector<HTMLButtonElement>('button[type="submit"]')?.disabled).toBe(true);
    page.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(open).not.toHaveBeenCalled();
    expect(page.querySelector('#contact-pending')).not.toBeNull();
  });

  it('opens the official URL with a personalized encoded message only on valid submit', async () => {
    const fixture = await setup(true);
    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    const formElement = (fixture.nativeElement as HTMLElement).querySelector('form')!;
    formElement.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(open).not.toHaveBeenCalled();
    fixture.componentInstance.form.patchValue({
      name: ' María ', service: 'novia', date: '2026-12-15', message: 'Disponibilidad & precios, por favor.',
    });
    await fixture.whenStable();
    formElement.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(open).toHaveBeenCalledOnce();
    const url = new URL(open.mock.calls[0][0] as string);
    expect(url.origin).toBe('https://wa.me');
    expect(url.searchParams.get('text')).toBe('Hola, soy María. Estoy interesada en el servicio de Maquillaje de Novia de Bella Studio. Mi evento será el 15/12/2026. Disponibilidad & precios, por favor.');
    expect(open.mock.calls[0].slice(1)).toEqual(['_blank', 'noopener,noreferrer']);
  });
});

describe('WhatsAppFloatingButtonComponent', () => {
  it('offers an informational button without a configured number', async () => {
    const fixture = TestBed.createComponent(WhatsAppFloatingButtonComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('a')).toBeNull();
    expect(fixture.nativeElement.querySelector('button')).not.toBeNull();
  });

  it('uses the configured number and default message with safe link attributes', async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: BOOKING_CONFIG, useValue: { ...bookingConfig, whatsappNumber: '1234567', defaultMessage: 'Hola & gracias' } }],
    });
    const fixture = TestBed.createComponent(WhatsAppFloatingButtonComponent);
    await fixture.whenStable();
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(new URL(link.href).searchParams.get('text')).toBe('Hola & gracias');
    expect(link.rel).toBe('noopener noreferrer');
    expect(link.getAttribute('aria-label')).toContain('WhatsApp');
  });
});
