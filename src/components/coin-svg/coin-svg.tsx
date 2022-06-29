import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { find } from 'lodash';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import { svgCoinPathHelper } from '../../common/utils';
import { GET_META_COIN_LOGO } from '../../graphql/queries';
import useStyles from './use-styles';

type Props = {
  coinSymbol: string;
  size?: string;
};

const CoinSVG = ({ coinSymbol, size }: Props) => {
  const classes = useStyles();
  let symbol = coinSymbol.toLowerCase();
  let imgCoinPath = '';
  let svgCoinPath = null;

  const { data: metadata } = useQuery(GET_META_COIN_LOGO, {
    // We refresh data list at least at reload
    fetchPolicy: 'cache-only'
  });

  const getCoinLogo = (symbol: string) => {
    if (!metadata || !metadata.metaCoinAll) {
      return 'n/d';
    }

    const coin = find(metadata.metaCoinAll, { symbol });

    if (!coin || !coin.logo) {
      return svgCoinPathHelper('btc');
    }

    return coin.logo;
  };

  try {
    svgCoinPath = svgCoinPathHelper(symbol);
  } catch (err) {
    symbol = 'cc-default';
    imgCoinPath =
      getCoinLogo(coinSymbol.toUpperCase()) ||
      'https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png';
  }

  return svgCoinPath ? (
    <ReactSVG
      src={svgCoinPath.default.src}
      className={clsx(
        classes.avatar,
        symbol,
        classes.regular,
        size === 'avatar' && classes[size],
        size === 'large' && classes[size]
      )}
    />
  ) : (
    <Image
      src={imgCoinPath}
      alt={`Logo ${coinSymbol}`}
      width="32"
      height="32"
      title={`Logo ${coinSymbol}`}
    />
  );
};

export default CoinSVG;
