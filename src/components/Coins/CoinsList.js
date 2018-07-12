/* eslint-disable no-debugger */
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import green from '@material-ui/core/colors/green'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Query } from 'react-apollo'
import CoinItem from './CoinItem'
import { GET_COINS_LIST_WITH_MARKETS } from '../../graphql/queries.js'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3
  },
  primaryText: {
    color: theme.palette.primary.main,
    marginTop: 0
  },
  fab: {
    position: 'absolute',
    top: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3
  },
  buttonLoadMore: {
    margin: '0 auto'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
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
    margin: theme.spacing.unit
  }
})

const CoinsList = ({ classes, loadingUI, refetchFn }) => {
  return (
    <div className={classes.root}>
      <h1 className={classes.primaryText}>Coins available {loadingUI}</h1>
      <Button
        mini
        variant="fab"
        color="primary"
        className={classes.fab}
        aria-label="Refetch coin list"
        disabled={loadingUI}
        onClick={() => refetchFn()}
      >
        <Icon>refresh</Icon>
      </Button>
      {loadingUI && <CircularProgress size={68} className={classes.fabProgress} />}
      <Query
        query={GET_COINS_LIST_WITH_MARKETS}
        notifyOnNetworkStatusChange
        variables={{ offset: 0, limit: 30 }}
        fetchPolicy="cache"
      >
        {({ loading, error, data, refetch, networkStatus, fetchMore }) => {
          loadingUI = loading
          refetchFn = refetch
          const onLoadMore = () => {
            fetchMore({
              variables: {
                offset: data.allCoins.length
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                return Object.assign({}, prev, {
                  allCoins: [...prev.allCoins, ...fetchMoreResult.allCoins]
                })
              }
            })
          }

          // if (loading || networkStatus === 3) return 'Fetching more...'
          if (loading && (!data.allCoins || networkStatus === 4)) return 'Loading coins list...'
          if (error) return `Error! ${error.message}`

          return (
            <React.Fragment>
              <List>
                {data.allCoins.map((coin) => (
                  <CoinItem key={coin.id} coin={coin} />
                ))}
              </List>

              <div className={classes.bottomListWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonLoadMore}
                  onClick={onLoadMore}
                  disabled={loading}
                >
                  Load more
                  <Icon className={classes.rightIcon}>arrow_downward</Icon>
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </React.Fragment>
          )
        }}
      </Query>
    </div>
  )
}

CoinsList.propTypes = {
  classes: PropTypes.object.isRequired,
  loadingUI: PropTypes.bool,
  refetchFn: PropTypes.func
}

export default withStyles(styles, { withTheme: true })(CoinsList)
