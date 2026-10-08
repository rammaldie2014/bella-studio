import { Component, computed, input } from '@angular/core';
import { MakeupService } from '../../models/makeup-service';
import { bookingConfig } from '../../../../shared/config/booking.config';
import { buildWhatsAppUrl } from '../../../../shared/utils/whatsapp';

@Component({
  selector: 'app-service-card',
  standalone: true,
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
})
export class ServiceCardComponent {
  readonly service = input.required<MakeupService>();
  protected readonly whatsappUrl = computed(() =>
    buildWhatsAppUrl(bookingConfig.whatsappNumber, this.service().whatsappMessage),
  );
}
