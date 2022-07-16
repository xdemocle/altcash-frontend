import { useQuery } from '@apollo/client';
import { Fragment } from 'react';
import { GET_TICKERS } from '../../graphql/queries';

const TickersLivePrice = () => {
  // const { data, networkStatus, refetch } =
  useQuery(GET_TICKERS, {
    pollInterval: 30000
  });

  // console.log('TickersLivePrice', data);

  return <Fragment />;
};

export default TickersLivePrice;
