import type { CartLine, Product, Size } from '../data/types';
import { SIZES } from '../data/types';
import { products as defaultCatalog } from '../data/products';

/**
 * Client-side stock checks.
 * IMPORTANT: stock is maintained manually in src/data/products.ts and is NOT synchronised
 * between customers/devices. These checks only prevent obviously invalid carts;
 * they do NOT guarantee real-time availability. The owner must confirm every order.
 */

export type StockProblem = 'unknownProduct' | 'inactive' | 'invalidSize' | 'sizeUnavailable' | 'exceedsStock' | 'invalidQty';

export interface StockCheck {
  ok: boolean;
  problem?: StockProblem;
  /** Units available for this product+size according to the catalog. */
  available: number;
}

export const isSize = (value: unknown): value is Size => SIZES.includes(value as Size);

export function getAvailable(product: Product | undefined, size: Size): number {
  if (!product || !product.active) return 0;
  const n = product.stock[size];
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

export function totalQuantity(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}

/** Can `qtyToAdd` more units of product+size be added, given what is already in the cart? */
export function checkAdd(
  lines: CartLine[],
  productId: string,
  size: Size,
  qtyToAdd = 1,
  catalog: Product[] = defaultCatalog,
): StockCheck {
  const product = catalog.find((p) => p.id === productId);
  if (!product) return { ok: false, problem: 'unknownProduct', available: 0 };
  if (!product.active) return { ok: false, problem: 'inactive', available: 0 };
  if (!isSize(size)) return { ok: false, problem: 'invalidSize', available: 0 };
  if (!Number.isInteger(qtyToAdd) || qtyToAdd < 1) return { ok: false, problem: 'invalidQty', available: 0 };

  const available = getAvailable(product, size);
  if (available === 0) return { ok: false, problem: 'sizeUnavailable', available };

  const inCart = lines.find((l) => l.productId === productId && l.size === size)?.qty ?? 0;
  if (inCart + qtyToAdd > available) return { ok: false, problem: 'exceedsStock', available };
  return { ok: true, available };
}

export interface CartIssue {
  productId: string;
  size: Size;
  problem: StockProblem;
  available: number;
}

/** Re-validates a whole cart against the current catalog (used before checkout and on submit). */
export function validateCart(lines: CartLine[], catalog: Product[] = defaultCatalog): CartIssue[] {
  const issues: CartIssue[] = [];
  for (const line of lines) {
    const product = catalog.find((p) => p.id === line.productId);
    if (!product) {
      issues.push({ productId: line.productId, size: line.size, problem: 'unknownProduct', available: 0 });
    } else if (!product.active) {
      issues.push({ productId: line.productId, size: line.size, problem: 'inactive', available: 0 });
    } else if (!isSize(line.size)) {
      issues.push({ productId: line.productId, size: line.size, problem: 'invalidSize', available: 0 });
    } else if (!Number.isInteger(line.qty) || line.qty < 1) {
      issues.push({ productId: line.productId, size: line.size, problem: 'invalidQty', available: 0 });
    } else {
      const available = getAvailable(product, line.size);
      if (available === 0) {
        issues.push({ productId: line.productId, size: line.size, problem: 'sizeUnavailable', available });
      } else if (line.qty > available) {
        issues.push({ productId: line.productId, size: line.size, problem: 'exceedsStock', available });
      }
    }
  }
  return issues;
}
