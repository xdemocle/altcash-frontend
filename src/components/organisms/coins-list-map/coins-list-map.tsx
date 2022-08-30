import { List } from '@mui/material';
import { Market } from '../../../graphql/types';
import CoinItem from '../coin-item';

type Props = {
  markets: Market[];
};

const CoinsListMap = ({ markets }: Props) => {
  return (
    <List>
      {markets.map((market: Market, ix: number) => {
        return market && <CoinItem key={`${market.name}${ix}`} coin={market} />;
      })}
    </List>
  );
};

export default CoinsListMap;
