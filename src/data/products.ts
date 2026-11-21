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
    {
    id: 'shirt-005', sku: 'LZ-005', active: true, featured: false, accent: '#8a1c2b',
    name: { el: 'Καρό Πουκάμισο Κόκκινο-Μπεζ', en: 'Red-Beige Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'shirt-005.webp', images: ['shirt-005-front.webp', 'shirt-005-back.webp'],
    stock: { M: 1, L: 2, XL: 1, XXL: 1, '3XL': 1 },
  },
    {
    id: 'shirt-006', sku: 'LZ-006', active: true, featured: false, accent: '#8a1c2b',
    name: { el: 'Καρό Πουκάμισο Μπλε-Μπεζ', en: 'Blue-Beige Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'shirt-006.webp', images: ['shirt-006-front.webp', 'shirt-006-back.webp'],
    stock: { M: 1, L: 1, XL: 1, XXL: 1, '3XL': 1 },
  },
    {
    id: 'shirt-007', sku: 'LZ-007', active: true, featured: false, accent: '#8a1c2b',
    name: { el: 'Καρό Πουκάμισο Πράσινο-Μπεζ', en: 'Green-Beige Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'shirt-007.webp', images: ['shirt-007-front.webp', 'shirt-007-back.webp'],
    stock: { M: 1, L: 1, XL: 1, XXL: 1, '3XL': 1 },
  },  {
    id: 'shirt-008', sku: 'LZ-008', active: true, featured: false, accent: '#8a1c2b',
    name: { el: 'Καρό Πουκάμισο Κόκκινο-Μπλε', en: 'Red-Blue Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'shirt-008.webp', images: ['shirt-008-front.webp', 'shirt-008-back.webp'],
    stock: { M: 1, L: 1, XL: 1, XXL: 1, '3XL': 1 },
  },  {
    id: 'shirt-009', sku: 'LZ-009', active: true, featured: false, accent: '#8a1c2b',
    name: { el: 'Καρό Πουκάμισο Μπλε-Καφέ', en: 'Blue-Brown Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'shirt-009.webp', images: ['shirt-009-front.webp', 'shirt-009-back.webp'],
    stock: { M: 1, L: 1, XL: 1, XXL: 1, '3XL': 1 },
  },  {
    id: 'shirt-010', sku: 'LZ-010', active: true, featured: false, accent: '#8a1c2b',
    name: { el: 'Καρό Πουκάμισο Μπλε', en: 'Blue Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'shirt-0010.webp', images: ['shirt-010-front.webp', 'shirt-010-back.webp'],
    stock: { M: 1, L: 1, XL: 1, XXL: 1, '3XL': 1 },
  },  {
    id: 'shirt-011', sku: 'LZ-011', active: true, featured: false, accent: '#8a1c2b',
    name: { el: 'Καρό Πουκάμισο Μαυρο-Μπεζ', en: 'Black-Beige Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'shirt-011.webp', images: ['shirt-011-front.webp', 'shirt-011-back.webp'],
    stock: { M: 1, L: 1, XL: 1, XXL: 1, '3XL': 1 },
  },
];

export const activeProducts = (): Product[] => products.filter((p) => p.active);
export const getProduct = (id: string, catalog: Product[] = products): Product | undefined =>
  catalog.find((p) => p.id === id);
