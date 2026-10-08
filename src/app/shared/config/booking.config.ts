import { buildWhatsAppUrl } from '../utils/whatsapp';
import { InjectionToken } from '@angular/core';

/** Configure the real international business number, digits only. */
export const bookingConfig: Readonly<{
  whatsappNumber: string | null;
  whatsappUrl: string | null;
  defaultMessage: string;
}> = {
  whatsappNumber: null,
  defaultMessage: 'Hola, quisiera más información sobre los servicios de Bella Studio.',
  get whatsappUrl(): string | null {
    return buildWhatsAppUrl(this.whatsappNumber);
  },
};

export const BOOKING_CONFIG = new InjectionToken<typeof bookingConfig>('BOOKING_CONFIG', {
  providedIn: 'root',
  factory: () => bookingConfig,
});
