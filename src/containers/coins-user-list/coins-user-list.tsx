import { useQuery } from '@apollo/client';
import { List, Typography } from '@mui/material';
import CoinItem, { ICoin } from '../../components/coin-item';
import { useUserCoinFavourites } from '../../context/user-coin-favourites';
import { GET_COINS } from '../../graphql/queries';
import useStyles from './use-styles';

interface Props {
  predefined?: string[];
}

const CoinsUserList = ({ predefined }: Props) => {
  const classes = useStyles();
  const { userCoinFavourites } = useUserCoinFavourites();
  const { loading, data, networkStatus } = useQuery(GET_COINS, {
    variables: {
      symbols: predefined ? predefined.join('|') : userCoinFavourites.join('|')
    }
  });

  return (
    <div className={classes.root}>
      {data && data.coins && !data.coins.length && networkStatus === 7 && (
        <Typography variant="subtitle1">
          No starred coins. Add some first.
        </Typography>
      )}
      {data && data.coins && (
        <List>
          {data.coins.map((coin: ICoin, ix: number) => (
            <CoinItem key={`${coin.name}${ix}`} coin={coin} />
          ))}
        </List>
      )}
      {loading && (!(data && data.coins) || networkStatus === 4) && (
        <Typography variant="subtitle1">Loading favourite list...</Typography>
      )}
    </div>
  );
};

export default CoinsUserList;
