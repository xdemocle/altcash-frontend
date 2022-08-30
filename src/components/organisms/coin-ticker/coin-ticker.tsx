import { useQuery } from '@apollo/client';
import { btcToRandPriceWithSymbol } from '../../../common/currency';
import { GET_PAIR, GET_TICKER } from '../../../graphql/queries';
import { Market } from '../../../graphql/types';

type Props = {
  coin: Market;
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
      {dataTicker.price && bitcoinRandPrice
        ? btcToRandPriceWithSymbol(dataTicker.price, bitcoinRandPrice)
        : 'n/d'}
    </span>
  );
};

export default CoinTicker;
