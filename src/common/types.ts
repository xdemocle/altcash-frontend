/* eslint-disable @typescript-eslint/no-explicit-any */
export type PaystackCurrency = 'NGN' | 'GHS' | 'USD' | 'ZAR';

declare global {
  interface Window {
    newrelic: any;
  }
}
