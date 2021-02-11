/* eslint-disable no-debugger */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import { ArrowDownward, Favorite, List as ListIcon } from '@material-ui/icons'
import green from '@material-ui/core/colors/green'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useQuery } from '@apollo/client'
import HeaderFabButtons from './HeaderFabButtons'
import CoinItem from './CoinItem'
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
    color: green[500],
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
  paper: {
    margin: '1rem 0'
  },
  tabRoot: {
    maxWidth: 'none',
    minWidth: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0
  }
})

// const CoinsPageEnhanced = compose(
//   withStyles(styles, { withTheme: true }),
//   graphql(GET_COINS_LIST_WITH_MARKETS, {
//     props: (data) => {
//       return data
//     },
//     options: (ownProps) => ({
//       fetchPolicy: 'cache-first',
//       notifyOnNetworkStatusChange: true,
//       variables: {
//         offset: 0,
//         limit: 20,
//         needle: ownProps.app.coinPageNeedle
//       }
//     })
//   })
// )(CoinsPage)

const CoinsPage = (props) => {
  const { classes } = props
  const [globalState, globalActions] = useGlobal()
  const [tab, setTab] = useState(0)
  const { loading, error, data, refetch, fetchMore, networkStatus } = useQuery(
    GET_COINS_LIST,
    {
      variables: { offset: 0, limit: 20, needle: globalState.coinPageNeedle }
    }
  )

  console.log('data', data)

  const handleChange = (event, tab) => {
    setTab({ tab })
  }

  const updateNeedle = (needle) => {
    globalActions.updateCoinPageNeedle(needle)
    refetch()
  }

  // const onLoadMore = () => {
  //   fetchMore({
  //     variables: {
  //       offset: allCoins.length
  //     },
  //     // updateQuery: (prev, { fetchMoreResult }) => {
  //     //   if (!fetchMoreResult) {
  //     //     return prev
  //     //   }
  //     //   return Object.assign({}, prev, {
  //     //     allCoins: [...prev.allCoins, ...fetchMoreResult.allCoins]
  //     //   })
  //     // }
  //   })
  // }

  // const showLoadMoreButton =
  //   allCoins &&
  //   allCoins.length < data._allCoinsMeta.count &&
  //   allCoins &&
  //   networkStatus !== 4

  return (
    <div className={classes.root}>
      <Typography
        color="primary"
        variant="h4"
        gutterBottom
        className={classes.title}
      >
        Coins available
      </Typography>

      <HeaderFabButtons
        loading={loading}
        coinPageNeedle={globalState.coinPageNeedle}
        updateNeedle={updateNeedle}
      />

      <Paper className={classes.paper}>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<ListIcon />} classes={{ root: classes.tabRoot }} />
          <Tab icon={<Favorite />} classes={{ root: classes.tabRoot }} />
        </Tabs>
      </Paper>
      {/*
      {tab === 0 && (
        <div>
          {error && <Typography>Error! {error.message}</Typography>}
          {allCoins && !allCoins.length && networkStatus === 7 && (
            <Typography variant="subtitle1">No results...</Typography>
          )}
          {loading && (!allCoins || networkStatus === 4) && (
            <Typography variant="subtitle2">Loading coins list...</Typography>
          )}
          {networkStatus !== 4 && allCoins && (
            <List>
              {allCoins.map((coin) => (
                <CoinItem key={coin.id} coin={coin} />
              ))}
            </List>
          )}

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
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          )}
        </div>
      )} */}
    </div>
  )
}

CoinsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(CoinsPage)
