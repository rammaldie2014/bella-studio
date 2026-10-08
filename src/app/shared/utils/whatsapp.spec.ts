import { buildWhatsAppUrl } from './whatsapp';

describe('buildWhatsAppUrl', () => {
  it('disables links for missing or malformed numbers', () => {
    for (const number of [null, '', '+51 000', 'abc', '0000000']) {
      expect(buildWhatsAppUrl(number, 'Consulta')).toBeNull();
    }
  });

  it('encodes a service message without changing its contents', () => {
    // Synthetic test fixture only; never used as a business contact.
    const number = '1234567';
    const message = 'Hola, ¿información de Novia & Fiesta?';
    const result = buildWhatsAppUrl(number, message)!;
    expect(result).toBe('https://wa.me/' + number + '?text=' + encodeURIComponent(message));
    expect(new URL(result).searchParams.get('text')).toBe(message);
    expect(buildWhatsAppUrl(number)).toBe('https://wa.me/' + number);
  });
});
