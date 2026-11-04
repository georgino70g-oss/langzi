import { describe, expect, it } from 'vitest';
import type { CartLine } from '../data/types';
import { computeTotals } from './orderSummary';

const lines = (qty: number): CartLine[] => [{ productId: 'shirt-001', size: 'M', qty }];

describe('computeTotals (shipping €5 per order, free pickup)', () => {
  it('adds €5 once per order for delivery, whatever the quantity', () => {
    expect(computeTotals(lines(1), 'shipping')).toMatchObject({ merchandiseSubtotal: 25, shippingCost: 5, total: 30 });
    expect(computeTotals(lines(2), 'shipping')).toMatchObject({ merchandiseSubtotal: 40, shippingCost: 5, total: 45 });
    expect(computeTotals(lines(3), 'shipping')).toMatchObject({ merchandiseSubtotal: 50, shippingCost: 5, total: 55 });
    expect(computeTotals(lines(7), 'shipping')).toMatchObject({ merchandiseSubtotal: 125, shippingCost: 5, total: 130 });
  });

  it('charges no shipping for store pickup', () => {
    expect(computeTotals(lines(3), 'pickup')).toMatchObject({ merchandiseSubtotal: 50, shippingCost: 0, total: 50 });
  });

  it('defaults to delivery', () => {
    expect(computeTotals(lines(1)).deliveryMethod).toBe('shipping');
  });
});
