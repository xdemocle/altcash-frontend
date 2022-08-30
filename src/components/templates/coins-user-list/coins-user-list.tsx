import { useQuery } from '@apollo/client';
import { List, Typography } from '@mui/material';
import { isUndefined } from 'lodash';
import { isServer } from '../../../common/utils';
import { GET_MARKETS } from '../../../graphql/queries';
import { Market } from '../../../graphql/types';
import useUserCoinFavourites from '../../../hooks/use-user-coin-favourites';
import Loader from '../../molecules/loader';
import CoinItem from '../../organisms/coin-item';
import useStyles from './use-styles';

interface CoinsUserListProps {
  predefined?: string[];
  markets: Market[];
}

const CoinsUserList = ({ predefined, markets }: CoinsUserListProps) => {
  const classes = useStyles();
  const { userCoinFavourites } = useUserCoinFavourites();
  const { loading, data, networkStatus } = useQuery(GET_MARKETS, {
    variables: {
      symbols: predefined ? predefined.join('|') : userCoinFavourites.join('|')
    }
  });

  const isFeaturedView = !isUndefined(predefined);
  const dataCoins = data?.markets;
  const coinsList = isServer() ? markets : dataCoins;

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
          {coinsList.map((coin: Market, ix: number) => (
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
