import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartLine, Size } from '../data/types';
import { getProduct } from '../data/products';
import { checkAdd, getAvailable, isSize, totalQuantity, validateCart } from '../utils/inventory';
import type { CartIssue, StockCheck } from '../utils/inventory';

const STORAGE_KEY = 'langzi-cart-v1';

/** Only product id, size and quantity are stored. Prices are always recalculated, never stored. */
function loadCart(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const lines: CartLine[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== 'object') continue;
      const { productId, size, qty } = item as Record<string, unknown>;
      if (typeof productId !== 'string' || !isSize(size)) continue;
      if (typeof qty !== 'number' || !Number.isInteger(qty) || qty < 1 || qty > 99) continue;
      if (!getProduct(productId)) continue; // drop products that no longer exist in the catalog
      if (lines.some((l) => l.productId === productId && l.size === size)) continue;
      lines.push({ productId, size, qty });
    }
    return lines;
  } catch {
    return [];
  }
}

interface CartValue {
  lines: CartLine[];
  count: number;
  issues: CartIssue[];
  add: (productId: string, size: Size, qty?: number) => StockCheck;
  setQty: (productId: string, size: Size, qty: number) => void;
  remove: (productId: string, size: Size) => void;
  clear: () => void;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage full / blocked: cart still works for this visit */
    }
  }, [lines]);

  // Keep several open tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setLines(loadCart());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const add = useCallback(
    (productId: string, size: Size, qty = 1): StockCheck => {
      const check = checkAdd(lines, productId, size, qty);
      if (!check.ok) return check;
      setLines((prev) => {
        const existing = prev.find((l) => l.productId === productId && l.size === size);
        if (existing) {
          return prev.map((l) => (l === existing ? { ...l, qty: l.qty + qty } : l));
        }
        return [...prev, { productId, size, qty }];
      });
      return check;
    },
    [lines],
  );

  const setQty = useCallback((productId: string, size: Size, qty: number) => {
    if (!Number.isInteger(qty) || qty < 1) return;
    const max = getAvailable(getProduct(productId), size);
    if (qty > max) return; // never raise above available stock
    setLines((prev) => prev.map((l) => (l.productId === productId && l.size === size ? { ...l, qty } : l)));
  }, []);

  const remove = useCallback((productId: string, size: Size) => {
    setLines((prev) => prev.filter((l) => !(l.productId === productId && l.size === size)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartValue>(
    () => ({ lines, count: totalQuantity(lines), issues: validateCart(lines), add, setQty, remove, clear }),
    [lines, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
