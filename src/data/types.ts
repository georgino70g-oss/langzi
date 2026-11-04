export type Lang = 'el' | 'en';

export const SIZES = ['M', 'L', 'XL', 'XXL', '3XL'] as const;
export type Size = (typeof SIZES)[number];

export interface LocalizedText {
  el: string;
  en: string;
}

export interface Product {
  /** Unique, URL-safe id. Used in the address: /products/<id> */
  id: string;
  /** Product code shown to customers and in orders. */
  sku: string;
  name: LocalizedText;
  description: LocalizedText;
  /** File name inside the root /images folder, e.g. "shirt-001-front.webp" */
  image: string;
  /** Optional extra file names inside /images (back view, detail...). */
  images?: string[];
  /** Set to false to hide a product without deleting it. */
  active: boolean;
  /** Units in stock per size. Maintained MANUALLY by the owner. 0 = unavailable. */
  stock: Record<Size, number>;
  tags?: string[];
  featured?: boolean;
  /** Optional colour (hex) used for the placeholder when the photo is missing. */
  accent?: string;
  /** true = placeholder/sample data. Remove this line for real products. */
  sample?: boolean;
}

export interface CartLine {
  productId: string;
  size: Size;
  qty: number;
}

/** shipping = delivered to the customer's address (shipping fee applies); pickup = collected at the store (free). */
export type DeliveryMethod = 'shipping' | 'pickup';
export type PaymentMethod = 'bank_transfer' | 'iris';
