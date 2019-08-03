/* eslint-disable no-debugger */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import green from '@material-ui/core/colors/green'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { graphql, compose } from 'react-apollo'
import HeaderFabButtons from './HeaderFabButtons'
import CoinItem from './CoinItem'
import { GET_APP, GET_COINS_LIST_WITH_MARKETS } from '../../graphql/queries'
import { UPDATE_COIN_PAGE_NEEDLE } from '../../graphql/mutations'

const styles = theme => ({
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

const msgLoadingCoinslist = <Typography variant="subtitle2">Loading coins list...</Typography>
const msgEmptyCoinslist = <Typography variant="subtitle1">No results...</Typography>
const msgError = (error) => <Typography>Error! {error.message}</Typography>
const CoinsList = (coins) => <List>{coins.map((coin) => <CoinItem key={coin.id} coin={coin} />)}</List>

class CoinsPage extends Component {
  state = {
    tab: 0
  }

  handleChange = (event, tab) => {
    this.setState({ tab })
  }

  render() {
    const { classes, data: { loading, error, refetch, fetchMore, networkStatus,
      allCoins, _allCoinsMeta }, app, updateCoinPageNeedle } = this.props

    const updateNeedle = (needle) => {
      updateCoinPageNeedle(needle)
      refetch()
    }

    const onLoadMore = () => {
      fetchMore({
        variables: {
          offset: allCoins.length
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          return Object.assign({}, prev, {
            allCoins: [...prev.allCoins, ...fetchMoreResult.allCoins]
          })
        }
      })
    }

    return (
      <div className={classes.root}>
        <Typography color="primary" variant="h4" gutterBottom className={classes.title}>
          Coins available
        </Typography>

        <HeaderFabButtons loading={loading} app={app} updateNeedle={updateNeedle} />

        <Paper className={classes.paper}>
          <Tabs
            value={this.state.tab}
            onChange={this.handleChange}
            fullWidth
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab icon={<Icon>list</Icon>} classes={{ root: classes.tabRoot }} />
            <Tab icon={<Icon>favorite</Icon>} classes={{ root: classes.tabRoot }} />
          </Tabs>
        </Paper>

        {this.state.tab === 0 && <div>
          {error && msgError(error)}
          {(allCoins && !allCoins.length && networkStatus === 7) && msgEmptyCoinslist}
          {(loading && (!allCoins || networkStatus === 4)) && msgLoadingCoinslist}
          {((networkStatus !== 4 && allCoins)) && CoinsList(allCoins)}

          {allCoins && (allCoins.length < _allCoinsMeta.count) && (allCoins && networkStatus !== 4) && <div className={classes.bottomListWrapper}>
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
          </div>}
        </div>}
      </div>
    )
  }
}

CoinsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  updateCoinPageNeedle: PropTypes.func.isRequired
}

const CoinsPageEnhanced = compose(
  withStyles(styles, { withTheme: true }),
  graphql(UPDATE_COIN_PAGE_NEEDLE, {
    props: ({ mutate }) => ({
      updateCoinPageNeedle: needle => mutate({ variables: { needle } })
    })
  }),
  graphql(GET_APP, {
    props: ({ data: { app } }) => {
      return {
        app
      }
    }
  }),
  graphql(GET_COINS_LIST_WITH_MARKETS, {
    props: (data) => {
      return data
    },
    options: (ownProps) => ({
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      variables: {
        offset: 0,
        limit: 20,
        needle: ownProps.app.coinPageNeedle
      }
    })
  })
)(CoinsPage)

export default CoinsPageEnhanced
