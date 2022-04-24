export const svgCoinPathHelper = (name: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(`cryptocurrency-icons/svg/color/${name}.svg`);
};

export const strPxRem = (px: string) => {
  return Number(px.replace('px', ''));
};

export const persistUserCoinFavourites = (coins: string[]) => {
  window.localStorage.setItem('userCoinFavourites', JSON.stringify(coins));
};
