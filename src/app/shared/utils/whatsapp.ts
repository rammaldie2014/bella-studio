/**
 * International digits only, without '+' or spaces. Returns null until configured.
 */
export function buildWhatsAppUrl(number: string | null, message = ''): string | null {
  if (!number || !/^[1-9]\d{6,14}$/.test(number)) return null;
  const url = `https://wa.me/${number}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}
