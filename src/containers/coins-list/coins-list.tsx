import { useQuery } from '@apollo/client';
import { Pagination, Typography } from '@mui/material';
import { clone, find } from 'lodash';
import { Fragment } from 'react';
import { COINS_PER_PAGE } from '../../common/constants';
import CoinsListMap from '../../components/coins-list-map';
import { useGlobal } from '../../context/global';
import { GET_COINS, GET_COUNT } from '../../graphql/queries';
import useStyles from './use-styles';

const CoinsList = () => {
  const classes = useStyles();
  const { coinListPage, coinPageNeedle, setCoinListPage } = useGlobal();
  const { data: dataCount } = useQuery(GET_COUNT);
  const { loading, error, data, networkStatus } = useQuery(GET_COINS, {
    // We refresh data list at least at reload
    fetchPolicy: 'cache-and-network',
    variables: {
      term: coinPageNeedle
    }
  });

  const getListSlice = (limit: number) => {
    const list = data ? clone(data.coins) : [];

    if (coinPageNeedle && !!coinPageNeedle.length) {
      return list;
    }

    const offset = (coinListPage - 1) * limit;

    return list.splice(offset, limit);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCoinListPage(page);
  };

  const coins = getListSlice(COINS_PER_PAGE);

  const coinsTotal =
    dataCount && dataCount.count
      ? find(dataCount.count, { name: 'markets' }).count
      : 0;

  const hidePagination = coinPageNeedle && !!coinPageNeedle.length;

  const paginationPages = Math.floor(coinsTotal / COINS_PER_PAGE);

  return (
    <Fragment>
      {error && <Typography>Error! {error.message}</Typography>}
      {coins && !coins.length && networkStatus === 7 && (
        <Typography variant="subtitle1">No results...</Typography>
      )}
      {loading && (!coins || networkStatus === 4) && (
        <Typography variant="subtitle2">Loading coins list...</Typography>
      )}
      {networkStatus !== 4 && coins && <CoinsListMap coins={coins} />}

      {!hidePagination && (
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
