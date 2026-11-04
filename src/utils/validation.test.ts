import { describe, expect, it } from 'vitest';
import { emptyCheckout, validateCheckout, isValidPhone, isValidPostalCode } from './validation';

const valid = {
  ...emptyCheckout,
  fullName: 'Γιώργος Παπαδόπουλος',
  phone: '6912345678',
  address: 'Εγνατία 10',
  postalCode: '54625',
  city: 'Θεσσαλονίκη',
  consent: true,
};

describe('validateCheckout', () => {
  it('accepts a complete valid form (email optional)', () => {
    expect(validateCheckout(valid)).toEqual({});
  });
  it('requires the mandatory fields and consent', () => {
    const errors = validateCheckout(emptyCheckout);
    expect(Object.keys(errors).sort()).toEqual(['address', 'city', 'consent', 'fullName', 'phone', 'postalCode']);
  });
  it('validates optional email only when provided', () => {
    expect(validateCheckout({ ...valid, email: 'bad' }).email).toBe('err.email');
    expect(validateCheckout({ ...valid, email: 'a@b.gr' }).email).toBeUndefined();
  });
  it('does not require an address for store pickup', () => {
    const pickup = { ...emptyCheckout, deliveryMethod: 'pickup' as const, fullName: 'Γιώργος Παπαδόπουλος', phone: '6912345678', consent: true };
    expect(validateCheckout(pickup)).toEqual({});
  });
  it('validates phone and postal code formats', () => {
    expect(isValidPhone('+30 691 234 5678')).toBe(true);
    expect(isValidPhone('123')).toBe(false);
    expect(isValidPostalCode('54625')).toBe(true);
    expect(isValidPostalCode('5462')).toBe(false);
  });
});
