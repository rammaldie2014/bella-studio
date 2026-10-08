import { Component, HostListener, inject, signal } from '@angular/core';
import { BOOKING_CONFIG } from '../../config/booking.config';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

@Component({
  selector: 'app-whatsapp-floating-button',
  standalone: true,
  templateUrl: './whatsapp-floating-button.html',
  styleUrl: './whatsapp-floating-button.scss',
})
export class WhatsAppFloatingButtonComponent {
  private readonly booking = inject(BOOKING_CONFIG);
  protected readonly url = buildWhatsAppUrl(this.booking.whatsappNumber, this.booking.defaultMessage);
  protected readonly noticeOpen = signal(false);

  @HostListener('document:keydown.escape')
  protected closeNotice(): void {
    this.noticeOpen.set(false);
  }
}
