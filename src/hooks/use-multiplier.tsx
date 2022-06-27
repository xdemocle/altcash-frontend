import { isNaN } from 'lodash';
import { useEffect, useState } from 'react';
import { btcToRandPrice } from '../common/currency';
import { ITicker } from '../components/coin-item/coin-item';
import useGlobal from './use-global';

const useMultiplier = (ticker: ITicker) => {
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
