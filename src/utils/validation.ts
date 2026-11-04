import type { DeliveryMethod, PaymentMethod } from '../data/types';

/** Checkout form validation. Returns error KEYS (translated in the UI), never raw text. */

export interface CheckoutValues {
  fullName: string;
  phone: string;
  email: string;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  address: string;
  postalCode: string;
  city: string;
  region: string;
  deliveryNotes: string;
  consent: boolean;
}

export type FieldError = 'err.required' | 'err.phone' | 'err.email' | 'err.postal' | 'err.name' | 'err.consent';
export type CheckoutErrors = Partial<Record<keyof CheckoutValues, FieldError>>;

export const emptyCheckout: CheckoutValues = {
  fullName: '',
  phone: '',
  email: '',
  deliveryMethod: 'shipping',
  paymentMethod: 'bank_transfer',
  address: '',
  postalCode: '',
  city: '',
  region: '',
  deliveryNotes: '',
  consent: false,
};

export function isValidPhone(value: string): boolean {
  const cleaned = value.replace(/[\s\-().]/g, '');
  return /^\+?\d{10,15}$/.test(cleaned);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/** Greek postal codes have 5 digits. */
export function isValidPostalCode(value: string): boolean {
  return /^\d{5}$/.test(value.replace(/\s/g, ''));
}

export function validateCheckout(v: CheckoutValues): CheckoutErrors {
  const e: CheckoutErrors = {};
  const name = v.fullName.trim();
  if (!name) e.fullName = 'err.required';
  else if (name.length < 3 || !name.includes(' ')) e.fullName = 'err.name';

  if (!v.phone.trim()) e.phone = 'err.required';
  else if (!isValidPhone(v.phone)) e.phone = 'err.phone';

  if (v.email.trim() && !isValidEmail(v.email.trim())) e.email = 'err.email';

  // Address is only needed when the order is delivered, not for store pickup.
  if (v.deliveryMethod === 'shipping') {
    if (!v.address.trim()) e.address = 'err.required';

    if (!v.postalCode.trim()) e.postalCode = 'err.required';
    else if (!isValidPostalCode(v.postalCode)) e.postalCode = 'err.postal';

    if (!v.city.trim()) e.city = 'err.required';
  }

  if (!v.consent) e.consent = 'err.consent';
  return e;
}
