import React, { Fragment } from 'react'
import { clone, find } from 'lodash'
import { useQuery } from '@apollo/client'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import green from '@material-ui/core/colors/green'
import Pagination from '@material-ui/lab/Pagination'
import CoinItem from './CoinItem'
import HeaderFabButtons from './HeaderFabButtons'
import { GET_COINS, GET_COUNT } from '../../graphql/queries'
import useGlobal from '../../common/globalStateHook'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.typography.pxToRem(theme.spacing(3)),
    [theme.breakpoints.only('xs')]: {
      padding: theme.typography.pxToRem(theme.spacing(1.5))
    }
  },
  title: {
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center'
    }
  },
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

const CoinsList = () => {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()
  const { data: dataCount } = useQuery(GET_COUNT)
  const { loading, error, data, networkStatus } = useQuery(GET_COINS, {
    // fetchPolicy: 'cache-first',
    // We refresh data list at least at reload
    fetchPolicy: 'cache-and-network',
    variables: {
      term: globalState.coinPageNeedle
    }
  })

  const getListSlice = (limit) => {
    const list = data ? clone(data.coins) : []

    if (globalState.coinPageNeedle && !!globalState.coinPageNeedle.length) {
      return list
    }

    const offset = (globalState.coinListPage - 1) * limit

    return list.splice(offset, limit)
  }

  const coins = getListSlice(30)

  const coinsTotal =
    dataCount && dataCount.count
      ? find(dataCount.count, { name: 'markets' }).count
      : 0

  const hidePagination =
    globalState.coinPageNeedle && !!globalState.coinPageNeedle.length

  const paginationPages = Math.floor(coinsTotal / 30)

  const updateNeedle = (needle) => {
    globalActions.updateCoinPageNeedle(needle)
  }

  const handleChange = (event, value) => {
    globalActions.setCoinListPage(value)
  }

  return (
    <Fragment>
      <HeaderFabButtons
        loading={loading}
        coinPageNeedle={globalState.coinPageNeedle}
        updateNeedle={updateNeedle}
      />
      {error && <Typography>Error! {error.message}</Typography>}
      {coins && !coins.length && networkStatus === 7 && (
        <Typography variant="subtitle1">No results...</Typography>
      )}
      {loading && (!coins || networkStatus === 4) && (
        <Typography variant="subtitle2">Loading coins list...</Typography>
      )}
      {networkStatus !== 4 && coins && (
        <List>
          {coins.map((coin, ix) => {
            return coin && <CoinItem key={`${coin.name}${ix}`} coin={coin} />
          })}
        </List>
      )}

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
