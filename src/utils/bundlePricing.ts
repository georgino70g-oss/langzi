/**
 * Bundle pricing — the ONLY place where the price algorithm lives.
 *
 * Prices (EUR): 1 shirt = 25, 2 shirts = 40, 3 shirts = 50.
 * Algorithm:
 *   threes    = floor(quantity / 3)
 *   remainder = quantity % 3   (0 -> 0, 1 -> 25, 2 -> 40)
 *   total     = threes * 50 + remainderPrice
 */
export const BUNDLE_PRICES: Record<1 | 2 | 3, number> = { 1: 25, 2: 40, 3: 50 };

export interface BundleLine {
  /** Bundle size: 3, 2 or 1 shirts. */
  bundleSize: 1 | 2 | 3;
  /** How many bundles of this size were applied. */
  count: number;
  unitPrice: number;
  subtotal: number;
}

export interface BundleBreakdown {
  quantity: number;
  lines: BundleLine[];
  total: number;
}

function assertValidQuantity(quantity: number): void {
  if (!Number.isInteger(quantity) || quantity < 0) {
    throw new RangeError(`Invalid quantity: ${quantity}`);
  }
}

export function getBundleBreakdown(quantity: number): BundleBreakdown {
  assertValidQuantity(quantity);
  const threes = Math.floor(quantity / 3);
  const remainder = quantity % 3;
  const lines: BundleLine[] = [];

  if (threes > 0) {
    lines.push({ bundleSize: 3, count: threes, unitPrice: BUNDLE_PRICES[3], subtotal: threes * BUNDLE_PRICES[3] });
  }
  if (remainder === 2) {
    lines.push({ bundleSize: 2, count: 1, unitPrice: BUNDLE_PRICES[2], subtotal: BUNDLE_PRICES[2] });
  } else if (remainder === 1) {
    lines.push({ bundleSize: 1, count: 1, unitPrice: BUNDLE_PRICES[1], subtotal: BUNDLE_PRICES[1] });
  }

  const total = lines.reduce((sum, l) => sum + l.subtotal, 0);
  return { quantity, lines, total };
}

export function calculateBundleTotal(quantity: number): number {
  return getBundleBreakdown(quantity).total;
}

export function formatEuro(amount: number, lang: 'el' | 'en' = 'el'): string {
  return new Intl.NumberFormat(lang === 'el' ? 'el-GR' : 'en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}
