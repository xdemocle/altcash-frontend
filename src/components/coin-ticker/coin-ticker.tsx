import { useQuery } from '@apollo/client';
import { btcToRandPriceWithSymbol } from '../../common/currency';
import { GET_TICKER, GET_PAIR } from '../../graphql/queries';
import { ICoin } from '../coin-item/coin-item';

type Props = {
  coin: ICoin;
};

const CoinTicker = ({ coin }: Props) => {
  const { data } = useQuery(GET_TICKER, {
    fetchPolicy: 'cache-first',
    variables: {
      id: coin && coin.id
    }
  });

  const { data: dataPair } = useQuery(GET_PAIR, {
    fetchPolicy: 'cache-first',
    variables: {
      pair: 'XBTZAR'
    }
  });

  if (!coin) {
    return null;
  }

  const dataTicker = data ? data.ticker : {};
  const bitcoinRandPrice = dataPair
    ? Number(dataPair.pair.last_trade)
    : undefined;

  return (
    <span>
      {dataTicker.askRate && bitcoinRandPrice
        ? btcToRandPriceWithSymbol(dataTicker.askRate, bitcoinRandPrice)
        : 'n/d'}
    </span>
  );
};

export default CoinTicker;
