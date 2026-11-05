// Test-only fixture catalog. Keeps the tests independent of the real products in src/data/products.ts.
import type { Product } from '../data/types';

/**
 * LANGZI product catalog — the ONLY file you edit to add/change products.
 *
 * To add a product: copy one block, change `id`, `sku`, names, descriptions,
 * image file names (files go in the root /images folder) and `stock`.
 * Set `active: false` to hide a product.
 *
 * !!! ALL ENTRIES BELOW ARE SAMPLE DATA (sample: true). Names, descriptions
 * and stock numbers are placeholders, NOT verified inventory. Replace them,
 * and delete the `sample: true` line, before going live. !!!
 */

const descEl = 'Casual ανδρικό πουκάμισο με καρό σχέδιο και κούμπωμα με κουμπιά.';
const descEn = "Casual men's plaid button-down shirt.";

export const products: Product[] = [
  {
    id: 'shirt-001', sku: 'LZ-001', active: true, featured: true, accent: '#8a1c2b',
    name: { el: 'Καρό Πουκάμισο Κόκκινο', en: 'Red Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'fixture-001-front.webp', images: ['fixture-001-back.webp'],
    stock: { M: 4, L: 6, XL: 5, XXL: 2, '3XL': 0 },
  },
  {
    id: 'shirt-002', sku: 'LZ-002', active: true, featured: true, accent: '#1f3a5f',
    name: { el: 'Καρό Πουκάμισο Μπλε Navy', en: 'Navy Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'fixture-002-front.webp', images: ['fixture-002-detail.webp'],
    stock: { M: 3, L: 5, XL: 5, XXL: 3, '3XL': 1 },
  },
  {
    id: 'shirt-003', sku: 'LZ-003', active: true, featured: true, accent: '#2f5d3a',
    name: { el: 'Καρό Πουκάμισο Πράσινο', en: 'Green Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'fixture-003-front.webp',
    stock: { M: 2, L: 4, XL: 4, XXL: 0, '3XL': 0 },
  },
  {
    id: 'shirt-004', sku: 'LZ-004', active: true, featured: true, accent: '#4a4a4a',
    name: { el: 'Καρό Πουκάμισο Γκρι', en: 'Grey Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'fixture-004-front.webp',
    stock: { M: 5, L: 5, XL: 3, XXL: 2, '3XL': 2 },
  },
  {
    id: 'shirt-005', sku: 'LZ-005', active: true, accent: '#9a5b1e',
    name: { el: 'Καρό Πουκάμισο Καφέ', en: 'Brown Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'fixture-005-front.webp',
    stock: { M: 3, L: 3, XL: 3, XXL: 1, '3XL': 0 },
  },
  {
    id: 'shirt-006', sku: 'LZ-006', active: true, accent: '#3b6a8a',
    name: { el: 'Καρό Πουκάμισο Γαλάζιο', en: 'Light Blue Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'fixture-006-front.webp',
    stock: { M: 6, L: 6, XL: 4, XXL: 2, '3XL': 1 },
  },
  {
    id: 'shirt-007', sku: 'LZ-007', active: true, accent: '#6b1f3a',
    name: { el: 'Καρό Πουκάμισο Μπορντό', en: 'Burgundy Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'fixture-007-front.webp',
    stock: { M: 2, L: 2, XL: 2, XXL: 2, '3XL': 2 },
  },
  {
    id: 'shirt-008', sku: 'LZ-008', active: true, accent: '#2b2b2b',
    name: { el: 'Καρό Πουκάμισο Μαύρο-Γκρι', en: 'Black & Grey Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'fixture-008-front.webp',
    stock: { M: 4, L: 4, XL: 4, XXL: 0, '3XL': 0 },
  },
  {
    id: 'shirt-009', sku: 'LZ-009', active: true, accent: '#7a6a2a',
    name: { el: 'Καρό Πουκάμισο Χακί', en: 'Khaki Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'fixture-009-front.webp',
    stock: { M: 3, L: 5, XL: 5, XXL: 3, '3XL': 0 },
  },
  {
    id: 'shirt-010', sku: 'LZ-010', active: true, accent: '#5a3a6a',
    name: { el: 'Καρό Πουκάμισο Μωβ', en: 'Purple Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'fixture-010-front.webp',
    stock: { M: 1, L: 2, XL: 2, XXL: 1, '3XL': 0 },
  },
  {
    id: 'shirt-011', sku: 'LZ-011', active: true, accent: '#a33a2b',
    name: { el: 'Καρό Πουκάμισο Κεραμιδί', en: 'Terracotta Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'fixture-011-front.webp',
    stock: { M: 4, L: 4, XL: 2, XXL: 2, '3XL': 1 },
  },
  {
    id: 'shirt-012', sku: 'LZ-012', active: true, accent: '#2a5a5a',
    name: { el: 'Καρό Πουκάμισο Πετρόλ', en: 'Teal Plaid Shirt' },
    description: { el: descEl, en: descEn },
    image: 'fixture-012-front.webp',
    stock: { M: 5, L: 3, XL: 3, XXL: 3, '3XL': 2 },
  },
  {
    // Example of an inactive product: it is NOT shown anywhere on the site.
    id: 'shirt-013', sku: 'LZ-013', active: false, accent: '#555555',
    name: { el: 'Καρό Πουκάμισο (ανενεργό δείγμα)', en: 'Plaid Shirt (inactive sample)' },
    description: { el: descEl, en: descEn },
    image: 'fixture-013-front.webp',
    stock: { M: 0, L: 0, XL: 0, XXL: 0, '3XL': 0 },
  },
];

export const activeProducts = (): Product[] => products.filter((p) => p.active);
export const getProduct = (id: string, catalog: Product[] = products): Product | undefined =>
  catalog.find((p) => p.id === id);
