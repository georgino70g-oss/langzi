import type { CartLine, DeliveryMethod } from '../data/types';
import { getProduct } from '../data/products';
import { siteConfig } from '../data/siteConfig';
import { getBundleBreakdown } from './bundlePricing';
import { totalQuantity } from './inventory';

export interface OrderTotals {
  shirts: number;
  merchandiseSubtotal: number;
  deliveryMethod: DeliveryMethod;
  /** False only when delivery is chosen and no shipping cost is configured. */
  shippingConfigured: boolean;
  shippingCost: number | null;
  /** null when the shipping cost is unknown: we never invent a grand total. */
  total: number | null;
}

/** Shipping is charged once per order; store pickup is free. */
export function computeTotals(lines: CartLine[], deliveryMethod: DeliveryMethod = 'shipping'): OrderTotals {
  const shirts = totalQuantity(lines);
  const merchandiseSubtotal = getBundleBreakdown(shirts).total;
  const configured = siteConfig.shippingCostEUR;

  let shippingCost: number | null;
  if (deliveryMethod === 'pickup') shippingCost = 0;
  else shippingCost = typeof configured === 'number' && configured >= 0 ? configured : null;

  return {
    shirts,
    merchandiseSubtotal,
    deliveryMethod,
    shippingConfigured: shippingCost !== null,
    shippingCost,
    total: shippingCost !== null ? merchandiseSubtotal + shippingCost : null,
  };
}

/** Plain-text order summary sent to Netlify Forms (read by the shop owner, so Greek names are used). */
export function buildOrderSummaryText(lines: CartLine[]): string {
  const rows = lines.map((l) => {
    const p = getProduct(l.productId);
    return `${p?.sku ?? '?'} | ${l.productId} | ${p?.name.el ?? '?'} | size ${l.size} | qty ${l.qty}`;
  });
  const { shirts, merchandiseSubtotal } = computeTotals(lines);
  const bundles = getBundleBreakdown(shirts)
    .lines.map((b) => `${b.count} x bundle of ${b.bundleSize} (${b.subtotal} EUR)`)
    .join(', ');
  return [...rows, '', `Shirts: ${shirts}`, `Bundles: ${bundles}`, `Merchandise subtotal: ${merchandiseSubtotal} EUR`].join('\n');
}
