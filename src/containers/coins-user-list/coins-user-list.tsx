import { useQuery } from '@apollo/client';
import { List, Typography } from '@mui/material';
import { isUndefined } from 'lodash';
import { isServer } from '../../common/utils';
import CoinItem from '../../components/coin-item';
import Loader from '../../components/loader';
import { GET_COINS } from '../../graphql/queries';
import { Coin } from '../../graphql/types';
import useUserCoinFavourites from '../../hooks/use-user-coin-favourites';
import useStyles from './use-styles';

interface CoinsUserListProps {
  predefined?: string[];
  coins: Coin[];
}

const CoinsUserList = ({ predefined, coins }: CoinsUserListProps) => {
  const classes = useStyles();
  const { userCoinFavourites } = useUserCoinFavourites();
  const { loading, data, networkStatus } = useQuery(GET_COINS, {
    variables: {
      symbols: predefined ? predefined.join('|') : userCoinFavourites.join('|')
    }
  });

  const isFeaturedView = !isUndefined(predefined);
  const dataCoins = data?.coins;
  const coinsList = isServer() ? coins : dataCoins;

  return (
    <div className={classes.root}>
      {!isServer() && coinsList && !coinsList.length && networkStatus === 7 && (
        <Typography variant="subtitle1">
          No{' '}
          {isFeaturedView
            ? 'featured coins.'
            : 'starred coins. Add some first.'}
        </Typography>
      )}
      {coinsList && (
        <List>
          {coinsList.map((coin: Coin, ix: number) => (
            <CoinItem key={`${coin.name}${ix}`} coin={coin} />
          ))}
        </List>
      )}
      {!isServer() && loading && (!coinsList || networkStatus === 4) && (
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
