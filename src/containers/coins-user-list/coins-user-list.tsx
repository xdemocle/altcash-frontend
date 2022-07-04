import { useQuery } from '@apollo/client';
import { List, Typography } from '@mui/material';
import { isUndefined } from 'lodash';
import CoinItem from '../../components/coin-item';
import Loader from '../../components/loader';
import { GET_COINS } from '../../graphql/queries';
import { Coin } from '../../graphql/types';
import useUserCoinFavourites from '../../hooks/use-user-coin-favourites';
import useStyles from './use-styles';

interface Props {
  predefined?: string[];
  coins: Coin[];
}

const CoinsUserList = ({ predefined }: Props) => {
  const classes = useStyles();
  const { userCoinFavourites } = useUserCoinFavourites();
  const { loading, data, networkStatus } = useQuery(GET_COINS, {
    variables: {
      symbols: predefined ? predefined.join('|') : userCoinFavourites.join('|')
    }
  });

  const isFeaturedView = !isUndefined(predefined);
  const dataCoins = data?.coins;

  return (
    <div className={classes.root}>
      {dataCoins && !dataCoins.length && networkStatus === 7 && (
        <Typography variant="subtitle1">
          No{' '}
          {isFeaturedView
            ? 'featured coins.'
            : 'starred coins. Add some first.'}
        </Typography>
      )}
      {dataCoins && (
        <List>
          {dataCoins.map((coin: Coin, ix: number) => (
            <CoinItem key={`${coin.name}${ix}`} coin={coin} />
          ))}
        </List>
      )}
      {loading && (!dataCoins || networkStatus === 4) && (
        <Loader
          text={
            <Typography variant="subtitle1">
              Loading {isFeaturedView ? 'featured' : 'favourite'} list...
            </Typography>
          }
        />
      )}
    </div>
  );
};

export default CoinsUserList;
