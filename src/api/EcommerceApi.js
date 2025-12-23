const currencyInfo = {
  currency_code: 'USD',
  locale: 'en-US',
};

const formatCurrency = (amountInCents, info = currencyInfo) => {
  const formatter = new Intl.NumberFormat(info.locale || 'en-US', {
    style: 'currency',
    currency: info.currency_code || 'USD',
  });

  return formatter.format((amountInCents || 0) / 100);
};

const products = [
  {
    id: 'energy-boost',
    title: 'Energy Reset Guide',
    subtitle: 'A science-backed plan to feel energized all day.',
    description: 'A step-by-step guide to boost your daily energy with nutrition, movement, and sleep rituals.',
    ribbon_text: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80' },
      { url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80' },
    ],
    variants: [
      {
        id: 'energy-boost-standard',
        title: 'Digital Guide',
        price_in_cents: 2900,
        sale_price_in_cents: 2400,
        price_formatted: formatCurrency(2900),
        sale_price_formatted: formatCurrency(2400),
        manage_inventory: false,
        inventory_quantity: 999,
        currency_info: currencyInfo,
      },
    ],
  },
  {
    id: 'sleep-master',
    title: 'Sleep Mastery Toolkit',
    subtitle: 'Transform your nights with calming routines.',
    description: 'Guided routines and worksheets to help you fall asleep faster and wake up refreshed.',
    ribbon_text: 'New',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80' },
      { url: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=1200&q=80' },
    ],
    variants: [
      {
        id: 'sleep-master-standard',
        title: 'Digital Toolkit',
        price_in_cents: 3500,
        sale_price_in_cents: null,
        price_formatted: formatCurrency(3500),
        sale_price_formatted: null,
        manage_inventory: false,
        inventory_quantity: 999,
        currency_info: currencyInfo,
      },
      {
        id: 'sleep-master-premium',
        title: 'Toolkit + Coaching Call',
        price_in_cents: 8900,
        sale_price_in_cents: 7900,
        price_formatted: formatCurrency(8900),
        sale_price_formatted: formatCurrency(7900),
        manage_inventory: true,
        inventory_quantity: 12,
        currency_info: currencyInfo,
        image_url: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
  {
    id: 'stress-reset',
    title: 'Stress Reset Workbook',
    subtitle: 'Reduce overwhelm in 10 minutes a day.',
    description: 'Actionable prompts and micro-habits to calm your nervous system.',
    ribbon_text: null,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80' },
    ],
    variants: [
      {
        id: 'stress-reset-standard',
        title: 'Digital Workbook',
        price_in_cents: 2200,
        sale_price_in_cents: null,
        price_formatted: formatCurrency(2200),
        sale_price_formatted: null,
        manage_inventory: false,
        inventory_quantity: 999,
        currency_info: currencyInfo,
      },
    ],
  },
  {
    id: 'focus-flow',
    title: 'Focus & Flow Planner',
    subtitle: 'Beat procrastination with a simple daily system.',
    description: 'A practical planning system to keep you focused on what matters.',
    ribbon_text: 'Limited',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=900&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80' },
      { url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80' },
    ],
    variants: [
      {
        id: 'focus-flow-standard',
        title: 'Digital Planner',
        price_in_cents: 2700,
        sale_price_in_cents: 2100,
        price_formatted: formatCurrency(2700),
        sale_price_formatted: formatCurrency(2100),
        manage_inventory: true,
        inventory_quantity: 25,
        currency_info: currencyInfo,
      },
    ],
  },
];

const getProducts = async () => {
  return { products };
};

const getProduct = async (productId) => {
  const product = products.find(item => item.id === productId);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

const getProductQuantities = async ({ product_ids: productIds }) => {
  const variants = products
    .filter(product => productIds.includes(product.id))
    .flatMap(product => product.variants.map(variant => ({
      id: variant.id,
      inventory_quantity: variant.inventory_quantity,
    })));

  return { variants };
};

const initializeCheckout = async ({ successUrl }) => {
  return { url: successUrl };
};

export {
  formatCurrency,
  getProduct,
  getProductQuantities,
  getProducts,
  initializeCheckout,
};
