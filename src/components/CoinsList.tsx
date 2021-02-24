import { useQuery } from '@apollo/client'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { clone, find } from 'lodash'
import React, { Fragment } from 'react'
import useGlobal from '../common/globalStateHook'
import { COINS_PER_PAGE } from '../constants'
import { GET_COINS, GET_COUNT } from '../graphql/queries'
import CoinsListMap from './CoinsListMap'

const CoinsList = () => {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()
  const { data: dataCount } = useQuery(GET_COUNT)
  const { loading, error, data, networkStatus } = useQuery(GET_COINS, {
    // We refresh data list at least at reload
    fetchPolicy: 'cache-and-network',
    variables: {
      term: globalState.coinPageNeedle
    }
  })

  const getListSlice = (limit: number) => {
    const list = data ? clone(data.coins) : []

    if (globalState.coinPageNeedle && !!globalState.coinPageNeedle.length) {
      return list
    }

    const offset = (globalState.coinListPage - 1) * limit

    return list.splice(offset, limit)
  }

  const coins = getListSlice(COINS_PER_PAGE)

  const coinsTotal =
    dataCount && dataCount.count
      ? find(dataCount.count, { name: 'markets' }).count
      : 0

  const hidePagination =
    globalState.coinPageNeedle && !!globalState.coinPageNeedle.length

  const paginationPages = Math.floor(coinsTotal / COINS_PER_PAGE)

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    globalActions.setCoinListPage(page)
  }

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
            page={globalState.coinListPage}
            defaultPage={1}
            siblingCount={6}
            onChange={handleChange}
            className="pagination-coins-list"
          />
        </div>
      )}
    </Fragment>
  )
}

export default CoinsList

const useStyles = makeStyles((theme) => ({
  buttonLoadMore: {
    margin: '0 auto'
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  buttonProgress: {
    color: green[100],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  bottomListWrapper: {
    position: 'relative',
    textAlign: 'center',
    margin: theme.spacing(1)
  },
  pagination: {
    textAlign: 'center',
    margin: '1.7rem 2rem 1.5rem 2rem'
  }
}))
