import React, { Fragment } from 'react'
import { find } from 'lodash'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import { ArrowDownward } from '@material-ui/icons'
import green from '@material-ui/core/colors/green'
import CircularProgress from '@material-ui/core/CircularProgress'
// import Pagination from '@material-ui/lab/Pagination'
import CoinItem from './CoinItem'
import HeaderFabButtons from './HeaderFabButtons'
import { GET_COINS_LIST } from '../../graphql/queries'
import useGlobal from '../../common/globalStateHook'

const styles = (theme) => ({
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
    margin: '1rem 2rem'
  }
})

const CoinsList = (props) => {
  const { classes } = props
  const [globalState, globalActions] = useGlobal()
  // const [page, setPage] = useState(1)
  const { loading, error, data, refetch, fetchMore, networkStatus } = useQuery(
    GET_COINS_LIST,
    {
      variables: {
        offset: 0,
        limit: 30,
        term: globalState.coinPageNeedle
      }
    }
  )

  const coinsTotal =
    data && data.count ? find(data.count, { name: 'markets' }).count : 0

  const updateNeedle = (needle) => {
    globalActions.updateCoinPageNeedle(needle)
    refetch()
  }

  const onLoadMore = () => {
    fetchMore({
      variables: {
        offset: data && data.coins.length
      }
    })
  }

  // const handleChange = (event, value) => {
  //   setPage(value)
  //   fetchMore({
  //     variables: {
  //       offset: 20 * value
  //     }
  //   })
  // }

  const showLoadMoreButton =
    data &&
    data.coins &&
    data.coins.length < coinsTotal &&
    networkStatus !== 4 &&
    !globalState.coinPageNeedle

  return (
    <Fragment>
      <HeaderFabButtons
        loading={loading}
        coinPageNeedle={globalState.coinPageNeedle}
        updateNeedle={updateNeedle}
      />
      {error && <Typography>Error! {error.message}</Typography>}
      {data && data.coins && !data.coins.length && networkStatus === 7 && (
        <Typography variant="subtitle1">No results...</Typography>
      )}
      {loading && ((data && !data.coins) || networkStatus === 4) && (
        <Typography variant="subtitle2">Loading coins list...</Typography>
      )}
      {networkStatus !== 4 && data && data.coins && (
        <List>
          {data.coins.map((coin, ix) => (
            <CoinItem key={`${coin.name}${ix}`} coin={coin} />
          ))}
        </List>
      )}

      {/* <div className={classes.pagination}>
        <Pagination
          count={coinsTotal / 20}
          size="large"
          color="primary"
          page={page}
          defaultPage={1}
          siblingCount={6}
          onChange={handleChange}
        />
      </div> */}

      {showLoadMoreButton && (
        <div className={classes.bottomListWrapper}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonLoadMore}
            onClick={onLoadMore}
            disabled={loading}
          >
            Load more
            <ArrowDownward className={classes.rightIcon} />
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </div>
      )}
    </Fragment>
  )
}

CoinsList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(CoinsList)
