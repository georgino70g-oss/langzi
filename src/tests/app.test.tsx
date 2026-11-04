// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { products } from '../data/products';

const goto = (path: string) => window.history.pushState({}, '', path);
const cartKey = 'langzi-cart-v1';
const storedCart = () => JSON.parse(window.localStorage.getItem(cartKey) ?? '[]') as Array<{ productId: string; size: string; qty: number }>;

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  goto('/');
});
afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

async function addShirt(user: ReturnType<typeof userEvent.setup>, productIndex: number, size: string) {
  const cards = screen.getAllByRole('article');
  const card = within(cards[productIndex]);
  await user.click(card.getByRole('radio', { name: new RegExp(`^(Μέγεθος|Size) ${size}$`) }));
  await user.click(card.getByRole('button', { name: /Προσθήκη στο καλάθι|Add to cart/ }));
}

describe('catalog and sizes', () => {
  it('shows only active products and a placeholder (not a broken image) when photos are missing', () => {
    goto('/products');
    render(<App />);
    const active = products.filter((p) => p.active).length;
    expect(screen.getAllByRole('article')).toHaveLength(active);
    expect(screen.queryByText(/ανενεργό δείγμα/)).toBeNull();
    expect(document.querySelectorAll('img').length).toBe(0);
    expect(screen.getAllByRole('img', { name: /Η φωτογραφία θα προστεθεί σύντομα/ }).length).toBe(active);
  });

  it('disables unavailable sizes and requires a size before adding', async () => {
    goto('/products');
    const user = userEvent.setup();
    render(<App />);
    const first = within(screen.getAllByRole('article')[0]);
    // shirt-001 has 0 stock in 3XL
    expect(first.getByRole('radio', { name: /3XL, μη διαθέσιμο/ })).toBeDisabled();
    await user.click(first.getByRole('button', { name: 'Προσθήκη στο καλάθι' }));
    expect(first.getByText(/επιλέξτε μέγεθος/i)).toBeInTheDocument();
    expect(storedCart()).toEqual([]);
  });
});

describe('cart', () => {
  it('mixes designs and sizes, applies bundle price, and persists after a "refresh"', async () => {
    goto('/products');
    const user = userEvent.setup();
    const first = render(<App />);
    await addShirt(user, 0, 'M');
    await addShirt(user, 1, 'L');
    await addShirt(user, 2, 'XL');
    expect(storedCart()).toHaveLength(3);
    first.unmount();

    // "Refresh": mount a fresh app on the cart page; state must come back from LocalStorage.
    goto('/cart');
    render(<App />);
    expect(screen.getByRole('link', { name: /Καλάθι, 3 τεμάχια/ })).toBeInTheDocument();
    expect(screen.getByText('Σύνολο προϊόντων').nextSibling?.textContent).toMatch(/50/);
    // Shipping is €5 per order, so 3 shirts: 50 + 5 = 55.
    expect(screen.getByText('Μεταφορικά').nextSibling?.textContent).toMatch(/5/);
    expect(screen.getByText('Πληρωτέο ποσό').nextSibling?.textContent).toMatch(/55/);
  });

  it('cannot exceed stock for a size', async () => {
    goto('/products');
    const user = userEvent.setup();
    render(<App />);
    // shirt-010 (index 9): stock M = 1
    await addShirt(user, 9, 'M');
    await addShirt(user, 9, 'M');
    expect(storedCart()).toEqual([{ productId: 'shirt-010', size: 'M', qty: 1 }]);
    expect(within(screen.getAllByRole('article')[9]).getByText(/μέγιστο διαθέσιμο/)).toBeInTheDocument();
  });

  it('drops invalid / unknown lines stored in LocalStorage', () => {
    window.localStorage.setItem(
      cartKey,
      JSON.stringify([
        { productId: 'ghost', size: 'M', qty: 1 },
        { productId: 'shirt-001', size: 'S', qty: 1 },
        { productId: 'shirt-001', size: 'M', qty: -3 },
        { productId: 'shirt-001', size: 'L', qty: 1 },
      ]),
    );
    goto('/cart');
    render(<App />);
    expect(screen.getByRole('link', { name: /Καλάθι, 1 τεμάχια/ })).toBeInTheDocument();
  });
});

describe('language', () => {
  it('switches to English and remembers the choice', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Καρό πουκάμισα για κάθε μέρα');
    await user.click(screen.getByRole('button', { name: 'EN' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Plaid shirts for every day');
    expect(window.localStorage.getItem('langzi-lang')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });
});

describe('checkout', () => {
  const formNames = () => {
    const html = readFileSync(resolve(process.cwd(), 'public/__forms.html'), 'utf8');
    return [...html.matchAll(/<(?:input|textarea)[^>]*\sname="([^"]+)"/g)].map((m) => m[1]).sort();
  };

  async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText(/Ονοματεπώνυμο/), 'Γιώργος Παπαδόπουλος');
    await user.type(screen.getByLabelText(/Τηλέφωνο/), '6912345678');
    await user.type(screen.getByLabelText(/Οδός και αριθμός/), 'Εγνατία 10');
    await user.type(screen.getByLabelText(/Τ\.Κ\./), '54625');
    await user.type(screen.getByLabelText(/Πόλη/), 'Θεσσαλονίκη');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: 'Υποβολή παραγγελίας' }));
  }

  const seedCart = () =>
    window.localStorage.setItem(
      cartKey,
      JSON.stringify([
        { productId: 'shirt-001', size: 'M', qty: 1 },
        { productId: 'shirt-002', size: 'XL', qty: 2 },
      ]),
    );

  it('shows inline validation messages and does not submit an invalid form', async () => {
    seedCart();
    vi.stubEnv('DEV', false);
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    goto('/checkout');
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Υποβολή παραγγελίας' }));
    expect(screen.getAllByText('Το πεδίο είναι υποχρεωτικό.').length).toBeGreaterThanOrEqual(5);
    expect(screen.getByText('Πρέπει να αποδεχτείτε για να συνεχίσετε.')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('submits exactly the fields registered in public/__forms.html, then clears the cart only on success', async () => {
    seedCart();
    vi.stubEnv('DEV', false);
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);
    goto('/checkout');
    const user = userEvent.setup();
    render(<App />);
    await fillAndSubmit(user);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/');
    expect(init.method).toBe('POST');
    const body = new URLSearchParams(init.body as string);
    expect(body.get('form-name')).toBe('langzi-order');
    expect([...body.keys()].sort()).toEqual(formNames().filter((n, i, a) => a.indexOf(n) === i));
    expect(body.get('merchandiseSubtotal')).toBe('50 EUR');
    expect(body.get('displayedTotal')).toBe('55 EUR');
    expect(body.get('shippingStatus')).toBe('5 EUR');
    expect(body.get('deliveryMethod')).toBe('shipping');
    expect(body.get('paymentMethod')).toBe('bank_transfer');
    expect(body.get('orderSummary')).toContain('LZ-001');

    await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Η παραγγελία σας υποβλήθηκε'));
    expect(storedCart()).toEqual([]);
  });

  it('keeps the cart and never claims success when the network fails', async () => {
    seedCart();
    vi.stubEnv('DEV', false);
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('offline')));
    goto('/checkout');
    const user = userEvent.setup();
    render(<App />);
    await fillAndSubmit(user);
    expect(await screen.findByText(/ΔΕΝ υποβλήθηκε λόγω προβλήματος σύνδεσης/)).toBeInTheDocument();
    expect(storedCart()).toHaveLength(2);
    expect(screen.queryByText('Η παραγγελία σας υποβλήθηκε')).toBeNull();
  });

  it('keeps the cart when Netlify rejects the submission', async () => {
    seedCart();
    vi.stubEnv('DEV', false);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }));
    goto('/checkout');
    const user = userEvent.setup();
    render(<App />);
    await fillAndSubmit(user);
    expect(await screen.findByText(/το αίτημα απορρίφθηκε/)).toBeInTheDocument();
    expect(storedCart()).toHaveLength(2);
  });
});

describe('top bar phone', () => {
  it('shows the phone number and weekday hours, with a working tel link, in both languages', async () => {
    const user = userEvent.setup();
    render(<App />);
    const link = screen.getByRole('link', { name: 'Κλήση στο 2310328128' });
    expect(link).toHaveAttribute('href', 'tel:+302310328128');
    expect(screen.getByText('Δευ–Παρ 10:00–14:30')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'EN' }));
    expect(screen.getByText('Mon–Fri 10:00–14:30')).toBeInTheDocument();
  });
});

describe('pickup and payment methods', () => {
  const seed = () =>
    window.localStorage.setItem(
      cartKey,
      JSON.stringify([
        { productId: 'shirt-001', size: 'M', qty: 1 },
        { productId: 'shirt-002', size: 'XL', qty: 2 },
      ]),
    );

  it('offers no cash on delivery on the checkout page', () => {
    seed();
    goto('/checkout');
    render(<App />);
    expect(document.body.textContent).not.toMatch(/αντικαταβολ/i);
    expect(screen.getByRole('radio', { name: /Τραπεζική κατάθεση \(IBAN\)/ })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'IRIS' })).toBeInTheDocument();
  });

  it('store pickup is free, hides the address fields and does not require them', async () => {
    seed();
    vi.stubEnv('DEV', false);
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);
    goto('/checkout');
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('radio', { name: /Παραλαβή από το κατάστημα/ }));
    expect(screen.queryByLabelText(/Οδός και αριθμός/)).toBeNull();
    expect(screen.getByText('Δωρεάν (παραλαβή από το κατάστημα)')).toBeInTheDocument();
    expect(screen.getByText('Πληρωτέο ποσό').nextSibling?.textContent).toMatch(/50/);

    await user.click(screen.getByRole('radio', { name: 'IRIS' }));
    await user.type(screen.getByLabelText(/Ονοματεπώνυμο/), 'Γιώργος Παπαδόπουλος');
    await user.type(screen.getByLabelText(/Τηλέφωνο/), '6912345678');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: 'Υποβολή παραγγελίας' }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const body = new URLSearchParams((fetchMock.mock.calls[0] as [string, RequestInit])[1].body as string);
    expect(body.get('deliveryMethod')).toBe('store_pickup');
    expect(body.get('paymentMethod')).toBe('iris');
    expect(body.get('address')).toBe('');
    expect(body.get('shippingStatus')).toBe('0 EUR (store pickup)');
    expect(body.get('displayedTotal')).toBe('50 EUR');

    await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Η παραγγελία σας υποβλήθηκε'));
    expect(screen.getByText(/παραλαβή από το κατάστημα\./)).toBeInTheDocument();
    // IRIS details are not configured yet: nothing is invented, the customer is told they will be sent.
    expect(screen.getByRole('heading', { name: 'Πληρωμή — IRIS' })).toBeInTheDocument();
    expect(screen.getByText(/Τα στοιχεία πληρωμής θα σας σταλούν/)).toBeInTheDocument();
  });
});
