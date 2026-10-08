import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAKEUP_SERVICES } from '../../data/makeup-services';
import { BOOKING_CONFIG } from '../../../../shared/config/booking.config';
import { buildWhatsAppUrl } from '../../../../shared/utils/whatsapp';
import { buildContactMessage, eventDateValidator, nameValidator } from '../../utils/contact-message';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  protected readonly services = MAKEUP_SERVICES;
  private readonly booking = inject(BOOKING_CONFIG);
  protected readonly whatsappAvailable = !!buildWhatsAppUrl(this.booking.whatsappNumber);
  readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [nameValidator] }),
    service: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, control =>
        !control.value || MAKEUP_SERVICES.some(service => service.id === control.value)
          ? null : { service: true }],
    }),
    date: new FormControl('', { nonNullable: true, validators: [eventDateValidator] }),
    message: new FormControl('', { nonNullable: true }),
  });

  protected checkDateInput(event: Event): void {
    if (event.target instanceof HTMLInputElement && event.target.validity.badInput) {
      this.form.controls.date.setErrors({ date: true });
    } else {
      this.form.controls.date.updateValueAndValidity();
    }
  }

  protected submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || !this.whatsappAvailable) return;
    const values = this.form.getRawValue();
    const service = this.services.find(item => item.id === values.service);
    if (!service) return;
    const message = buildContactMessage({ ...values, serviceTitle: service.title });
    const url = buildWhatsAppUrl(this.booking.whatsappNumber, message);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }
}
