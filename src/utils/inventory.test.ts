import { describe, expect, it } from 'vitest';
import type { CartLine, Product } from '../data/types';
import { checkAdd, validateCart } from './inventory';

const make = (over: Partial<Product> = {}): Product => ({
  id: 'p1',
  sku: 'T-1',
  name: { el: 'Τεστ', en: 'Test' },
  description: { el: '', en: '' },
  image: 'x.webp',
  active: true,
  stock: { M: 2, L: 0, XL: 1, XXL: 0, '3XL': 0 },
  ...over,
});

describe('checkAdd', () => {
  const catalog = [make(), make({ id: 'p2', active: false })];

  it('allows adding an available size', () => {
    expect(checkAdd([], 'p1', 'M', 1, catalog).ok).toBe(true);
  });
  it('rejects unavailable (zero stock) sizes', () => {
    expect(checkAdd([], 'p1', 'L', 1, catalog)).toMatchObject({ ok: false, problem: 'sizeUnavailable' });
  });
  it('rejects exceeding stock considering what is already in the cart', () => {
    const lines: CartLine[] = [{ productId: 'p1', size: 'M', qty: 2 }];
    expect(checkAdd(lines, 'p1', 'M', 1, catalog)).toMatchObject({ ok: false, problem: 'exceedsStock', available: 2 });
  });
  it('rejects unknown and inactive products', () => {
    expect(checkAdd([], 'nope', 'M', 1, catalog).problem).toBe('unknownProduct');
    expect(checkAdd([], 'p2', 'M', 1, catalog).problem).toBe('inactive');
  });
  it('rejects invalid quantities', () => {
    expect(checkAdd([], 'p1', 'M', 0, catalog).problem).toBe('invalidQty');
    expect(checkAdd([], 'p1', 'M', 1.5, catalog).problem).toBe('invalidQty');
  });
});

describe('validateCart', () => {
  const catalog = [make()];
  it('returns no issues for a valid cart mixing sizes', () => {
    const lines: CartLine[] = [
      { productId: 'p1', size: 'M', qty: 2 },
      { productId: 'p1', size: 'XL', qty: 1 },
    ];
    expect(validateCart(lines, catalog)).toEqual([]);
  });
  it('flags quantity above stock, unavailable size and unknown product', () => {
    const lines: CartLine[] = [
      { productId: 'p1', size: 'M', qty: 3 },
      { productId: 'p1', size: 'L', qty: 1 },
      { productId: 'zzz', size: 'M', qty: 1 },
    ];
    expect(validateCart(lines, catalog).map((i) => i.problem)).toEqual([
      'exceedsStock',
      'sizeUnavailable',
      'unknownProduct',
    ]);
  });
});
