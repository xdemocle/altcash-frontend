import { List } from '@mui/material';
import CoinItem from '../coin-item';
import { ICoin } from '../coin-item/coin-item';

type Props = {
  coins: ICoin[];
};

const CoinsListMap = ({ coins }: Props) => {
  return (
    <List>
      {coins.map((coin: ICoin, ix: number) => {
        return coin && <CoinItem key={`${coin.name}${ix}`} coin={coin} />;
      })}
    </List>
  );
};

export default CoinsListMap;
