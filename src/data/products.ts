import type { Product } from './types';

/**
 * LANGZI product catalog — the ONLY file you edit to add/change products.
 *
 * To add a product: copy one block, change `id`, `sku`, names, descriptions,
 * image file names (files go in the root /images folder) and `stock`.
 * Set `active: false` to hide a product.
 */

const descEl = 'Casual ανδρικό πουκάμισο με καρό σχέδιο και κούμπωμα με κουμπιά. Ψιλή φανέλα viela 85% βαμβάκι-15% πολυέστερ.';
const descEn = "Casual men's plaid button-down shirt. Fine knit viela 85% cotton-15% polyester.";

export const products: Product[] = [
  {
    id: 'shirt-001', sku: 'LZ-001', active: true, featured: true, accent: '#8a1c2b',
    name: { el: 'Καρό Πουκάμισο Κόκκινο-Μπλε -Κρεμ', en: 'Red-Blue Cream Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'shirt-001.webp', images: ['shirt-001-front.webp', 'shirt-001-back.webp'],
    stock: { M: 1, L: 1, XL: 1, XXL: 1, '3XL': 1 },
  },
  {
    id: 'shirt-002', sku: 'LZ-002', active: true, featured: true, accent: '#1f3a5f',
    name: { el: 'Καρό Πουκάμισο Μπεζ- Μπλε Navy', en: 'Beige-Navy Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'shirt-002.webp', images: ['shirt-002-front.webp', 'shirt-002-back.webp'],
    stock: { M: 1, L: 1, XL: 1, XXL: 1, '3XL': 1 },
  },
  {
    id: 'shirt-003', sku: 'LZ-003', active: true, featured: true, accent: '#2f5d3a',
    name: { el: 'Καρό Πουκάμισο Μπλε-Γαλάζιο', en: 'Blue-Aqua Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'shirt-003.webp', images: ['shirt-003-front.webp', 'shirt-003-back.webp'],
    stock: { M: 1, L: 1, XL: 1, XXL: 1, '3XL': 1 },
  },
  {
    id: 'shirt-004', sku: 'LZ-004', active: true, featured: true, accent: '#4a4a4a',
    name: { el: 'Καρό Πουκάμισο Μπεζ-Πράσινο', en: 'Beige-Green Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'shirt-004.webp', images: ['shirt-004-front.webp', 'shirt-004-back.webp'],
    stock: { M: 1, L: 1, XL: 1, XXL: 1, '3XL': 1 },
  },
];

export const activeProducts = (): Product[] => products.filter((p) => p.active);
export const getProduct = (id: string, catalog: Product[] = products): Product | undefined =>
  catalog.find((p) => p.id === id);
