export const btcToRandPrice = (
  amounBTC: number,
  bitcoinRandPrice: number
): number => {
  let num = 0;

  try {
    num = amounBTC * bitcoinRandPrice;
  } catch (error) {
    return NaN;
  }

  return Number(num);
};

export const btcToRandPriceWithSymbol = (
  amounBTC: number,
  bitcoinRandPrice: number
): string => {
  let num = 0;

  try {
    num = amounBTC * bitcoinRandPrice;
  } catch (error) {
    return 'n/d';
  }

  const output = String(num.toFixed(2))
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    .replace(/^/, 'R ');

  return output;
};
