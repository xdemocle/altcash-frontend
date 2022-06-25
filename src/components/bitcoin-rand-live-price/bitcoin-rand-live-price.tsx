import { useLazyQuery } from '@apollo/client';
import { Fragment, useEffect } from 'react';
import { REFRESH_BTCZAR_LIVE_PRICE } from '../../common/constants';
import { useGlobal } from '../../context/global';
import { GET_PAIR } from '../../graphql/queries';

const BitcoinRandLivePrice = () => {
  const { setBitcoinRandPrice } = useGlobal();
  const [getLivePrice, { data }] = useLazyQuery(GET_PAIR, {
    fetchPolicy: 'cache-and-network',
    variables: {
      pair: 'XBTZAR'
    }
  });

  useEffect(() => {
    getLivePrice();

    const intervalBtcPrice = setInterval(
      () => getLivePrice(),
      REFRESH_BTCZAR_LIVE_PRICE
    );

    return () => {
      window.clearInterval(intervalBtcPrice);
    };
  }, [getLivePrice]);

  // Set globally
  if (data && data.pair && data.pair.last_trade) {
    setBitcoinRandPrice(Number(data.pair.last_trade));
  }

  // eslint-disable-next-line no-console
  console.info('bitcoinRandPrice', data && data.pair && data.pair.last_trade);

  return <Fragment />;
};

export default BitcoinRandLivePrice;
