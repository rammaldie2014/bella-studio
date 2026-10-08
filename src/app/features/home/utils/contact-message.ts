import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nameValidator(control: AbstractControl<string>): ValidationErrors | null {
  const name = control.value.trim();
  if (!name) return { required: true };
  return Array.from(name).length < 2 ? { minlength: true } : null;
}

export function eventDateValidator(control: AbstractControl<string>): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith('0000')) return { date: true };
  const parsed = new Date(value + 'T00:00:00Z');
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
    ? null : { date: true };
}

export function buildContactMessage(values: {
  name: string; serviceTitle: string; date: string; message: string;
}): string {
  const parts = [
    `Hola, soy ${values.name.trim()}. Estoy interesada en el servicio de ${values.serviceTitle} de Bella Studio.`,
  ];
  if (values.date) parts.push(`Mi evento será el ${values.date.split('-').reverse().join('/')}.`);
  if (values.message.trim()) parts.push(values.message.trim());
  return parts.join(' ');
}
