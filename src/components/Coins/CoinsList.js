/* eslint-disable no-debugger */
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
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
  }
})

const CoinsList = ({ classes }) => {
  let refetchFn = null

  return (
    <div className={classes.root}>
      <h1 className={classes.primaryText}>Coins available</h1>
      <Button
        mini
        variant="fab"
        color="primary"
        className={classes.fab}
        aria-label="Refetch coin list"
        onClick={() => refetchFn()}
      >
        <Icon>refresh</Icon>
      </Button>
      <Query query={GET_COINS_LIST_WITH_MARKETS} notifyOnNetworkStatusChange>
        {({ loading, error, data, refetch, networkStatus }) => {
          refetchFn = refetch
          if (loading || networkStatus === 4) return 'Loading coins list...'
          if (error) return `Error! ${error.message}`

          return (
            <React.Fragment>
              <List>
                {data.allCoins.map((coin) => (
                  <CoinItem key={coin.id} coin={coin} />
                ))}
              </List>
            </React.Fragment>
          )
        }}
      </Query>
    </div>
  )
}

CoinsList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(CoinsList)
