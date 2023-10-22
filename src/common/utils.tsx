import { PaystackProps } from 'react-paystack/dist/types';
import { PAYSTACK_EMAIL, PAYSTACK_PUBLICK_KEY } from './constants';
import { PaystackCurrency } from './types';

export const svgCoinPathHelper = (name: string) => {
  return require(`cryptocurrency-icons/svg/color/${name}.svg`);
};

export const strPxRem = (px: string) => {
  return Number(px.replace('px', ''));
};

export const persistFavourites = (coins: string[]) => {
  if (isServer()) return;
  window.localStorage.setItem('userCoinFavourites', JSON.stringify(coins));
};

export const getPaystackConfig = (amount: number) => {
  return {
    reference: new Date().getTime().toString(),
    email: PAYSTACK_EMAIL,
    amount: Number(Number(amount * 100).toFixed(0)),
    currency: 'ZAR' as PaystackCurrency,
    publicKey: PAYSTACK_PUBLICK_KEY
  } as PaystackProps;
};

export const isServer = () => typeof window === 'undefined';
