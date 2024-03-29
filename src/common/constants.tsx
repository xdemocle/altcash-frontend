export const REFRESH_BTCZAR_LIVE_PRICE = 25000; // 22 * 1000 = 22 seconds

export const PERCENTAGE_FEE = 15;

export const PERCENTAGE_FEE_PAYMENT = 2.9;

export const PERCENTAGE_FEE_EXCHANGE = 0.01;

export const MIN_AMOUNT_EXTRA = 1;

export const MIN_AMOUNT_MULTIPLIER = 15;

export const COINS_PER_PAGE = 30;

export const SYMBOLS_FEATURED = [
  'ETH',
  'DOT',
  'BCH',
  'XRP',
  'ADA',
  'BNB',
  'LTC',
  'LINK',
  'XLM',
  'DOGE',
  'USDC',
  'UNI',
  'WBTC'
];

export const GOOGLE_CAPTCHA_SITEKEY =
  '6LchYHUaAAAAAOFX3hvJfIKirgL7465qTK-_9y3B';

export const PAYSTACK_EMAIL = process.env.NEXT_PUBLIC_PAYSTACK_EMAIL;

export const PAYSTACK_PUBLICK_KEY =
  process.env.NEXT_PUBLIC_PAYSTACK_PUBLICK_KEY;

// eslint-disable-next-line
export const FORM_EMAIL_VALIDATION_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const REQUIRED_EMAIL_TEXT = 'E-Mail field is incorrect';

export const REQUIRED_PASSWORD_TEXT =
  'Password field must have at least 8 characters';

export const BUY_TABS_DEFAULT = 0;
export const BUY_TAB_FEATURED = 0;
export const BUY_TAB_ALL = 1;
export const BUY_TAB_FAVOURITE = 2;
