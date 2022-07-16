import { useQuery } from '@apollo/client';
import { Pagination, Typography } from '@mui/material';
import { clone, find } from 'lodash';
import { ChangeEvent, Fragment } from 'react';
import { COINS_PER_PAGE } from '../../common/constants';
import { isServer } from '../../common/utils';
import CoinsListMap from '../../components/coins-list-map';
import Loader from '../../components/loader';
import { GET_MARKETS, GET_COUNT } from '../../graphql/queries';
import { Market } from '../../graphql/types';
import useGlobal from '../../hooks/use-global';
import useStyles from './use-styles';

interface CoinsListProps {
  markets: Market[];
}

const CoinsList = ({ markets }: CoinsListProps) => {
  const classes = useStyles();
  const { coinListPage, coinPageNeedle, setCoinListPage } = useGlobal();
  const { data: dataCount } = useQuery(GET_COUNT);
  const { loading, error, data, networkStatus } = useQuery(GET_MARKETS, {
    // We refresh data list at least at reload
    fetchPolicy: 'cache-and-network',
    variables: {
      term: coinPageNeedle
    }
  });
  const dataCoins = data?.markets;

  const getListSlice = (limit: number) => {
    const list = dataCoins ? clone(dataCoins) : [];

    if (coinPageNeedle && !!coinPageNeedle.length) {
      return list;
    }

    const offset = (coinListPage - 1) * limit;

    return list.splice(offset, limit);
  };

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setCoinListPage(page);
  };

  const hidePagination = coinPageNeedle && !!coinPageNeedle.length;
  const coinsList = isServer() ? markets : getListSlice(COINS_PER_PAGE);
  const coinsTotal =
    dataCount && dataCount.count
      ? find(dataCount.count, { name: 'markets' }).count
      : 0;
  const paginationPages = Math.floor(coinsTotal / COINS_PER_PAGE);

  return (
    <Fragment>
      {error && <Typography>Error! {error.message}</Typography>}

      {coinsList && !coinsList.length && networkStatus === 7 && (
        <Typography variant="subtitle1">No results...</Typography>
      )}

      {!isServer() && loading && (!coinsList || networkStatus === 4) && (
        <Loader
          text={
            <Typography variant="subtitle2">Loading coins list...</Typography>
          }
        />
      )}

      {(networkStatus !== 4 || isServer()) && coinsList && (
        <CoinsListMap markets={coinsList} />
      )}

      {!isServer() && !hidePagination && (
        <div className={classes.pagination}>
          <Pagination
            count={paginationPages}
            size="large"
            color="primary"
            page={coinListPage}
            defaultPage={1}
            siblingCount={6}
            onChange={handleChange}
            className="pagination-coins-list"
          />
        </div>
      )}
    </Fragment>
  );
};

export default CoinsList;
