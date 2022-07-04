import { useLazyQuery } from '@apollo/client';
import { Fragment, useEffect } from 'react';
import { REFRESH_BTCZAR_LIVE_PRICE } from '../../common/constants';
import { isServer } from '../../common/utils';
import { GET_PAIR } from '../../graphql/queries';
import useGlobal from '../../hooks/use-global';

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
      if (!isServer()) {
        window.clearInterval(intervalBtcPrice);
      }
    };
  }, [getLivePrice]);

  useEffect(() => {
    // Set globally
    if (data && data.pair && data.pair.last_trade) {
      setBitcoinRandPrice(Number(data.pair.last_trade));
    }
  }, [data, setBitcoinRandPrice]);

  // eslint-disable-next-line no-console
  console.info('bitcoinRandPrice', data && data.pair && data.pair.last_trade);

  return <Fragment />;
};

export default BitcoinRandLivePrice;
