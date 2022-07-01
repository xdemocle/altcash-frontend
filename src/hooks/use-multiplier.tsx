import { isNaN } from 'lodash';
import { useEffect, useState } from 'react';
import { btcToRandPrice } from '../common/currency';
import { Ticker } from '../graphql/types';
import useGlobal from './use-global';

const useMultiplier = (ticker: Ticker) => {
  const { bitcoinRandPrice } = useGlobal();
  const [multiplier, setMultiplier] = useState(1);

  useEffect(() => {
    const newMultiplier = Number(
      btcToRandPrice(ticker.askRate, bitcoinRandPrice)
    );

    if (!isNaN(newMultiplier)) {
      setMultiplier(newMultiplier);
    }
  }, [ticker, bitcoinRandPrice]);

  return {
    multiplier
  };
};

export default useMultiplier;
