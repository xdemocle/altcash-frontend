import { List } from '@mui/material';
import { Coin } from '../../graphql/types';
import CoinItem from '../coin-item';

type Props = {
  coins: Coin[];
};

const CoinsListMap = ({ coins }: Props) => {
  return (
    <List>
      {coins.map((coin: Coin, ix: number) => {
        return coin && <CoinItem key={`${coin.name}${ix}`} coin={coin} />;
      })}
    </List>
  );
};

export default CoinsListMap;
