import { describe, expect, it } from 'vitest';
import { calculateBundleTotal, getBundleBreakdown } from './bundlePricing';

describe('calculateBundleTotal', () => {
  const specified: Array<[number, number]> = [
    [0, 0],
    [1, 25],
    [2, 40],
    [3, 50],
    [4, 75],
    [5, 90],
    [6, 100],
    [7, 125],
  ];

  it.each(specified)('quantity %i costs €%i (values from the specification)', (qty, price) => {
    expect(calculateBundleTotal(qty)).toBe(price);
  });

  it('matches the specified algorithm for quantities 0 through 30', () => {
    for (let q = 0; q <= 30; q++) {
      const remainderPrice = [0, 25, 40][q % 3];
      expect(calculateBundleTotal(q)).toBe(Math.floor(q / 3) * 50 + remainderPrice);
    }
  });

  it('never gets cheaper when adding a shirt', () => {
    for (let q = 0; q < 30; q++) {
      expect(calculateBundleTotal(q + 1)).toBeGreaterThan(calculateBundleTotal(q));
    }
  });

  it('breakdown lines add up to the total', () => {
    for (let q = 0; q <= 20; q++) {
      const b = getBundleBreakdown(q);
      expect(b.lines.reduce((s, l) => s + l.subtotal, 0)).toBe(b.total);
      expect(b.lines.reduce((s, l) => s + l.bundleSize * l.count, 0)).toBe(q);
    }
  });

  it('uses the maximum number of three-shirt bundles', () => {
    const b = getBundleBreakdown(7);
    expect(b.lines).toEqual([
      { bundleSize: 3, count: 2, unitPrice: 50, subtotal: 100 },
      { bundleSize: 1, count: 1, unitPrice: 25, subtotal: 25 },
    ]);
  });

  it('rejects invalid quantities', () => {
    expect(() => calculateBundleTotal(-1)).toThrow(RangeError);
    expect(() => calculateBundleTotal(1.5)).toThrow(RangeError);
    expect(() => calculateBundleTotal(NaN)).toThrow(RangeError);
  });
});
