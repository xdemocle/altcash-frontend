/* eslint-disable no-debugger */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { graphql } from 'react-apollo'
import CoinItem from './CoinItem'
import { GET_COINS_LIST } from '../../graphql/queries.js'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3
  },
  primaryText: {
    color: theme.palette.primary.main
  }
})

class CoinsList extends Component {
  state = {
    dense: false
  }

  render() {
    const { coins, classes } = this.props
    const { dense } = this.state

    return (
      <div className={classes.root}>
        <h1 className={classes.primaryText}>Coins available</h1>
        <List dense={dense}>
          {coins.map((coin) => (
            <React.Fragment key={coin.id}>
              <CoinItem coin={coin} />
              <li>
                <Divider inset />
              </li>
            </React.Fragment>
          ))}
        </List>
      </div>
    )
  }
}

CoinsList.propTypes = {
  classes: PropTypes.object.isRequired,
  coins: PropTypes.array.isRequired
}

const CoinsListWithData = compose(
  withStyles(styles, { withTheme: true }),
  graphql(GET_COINS_LIST, {
    props: ({ data }) => {
      if (data.loading || data.error) return { coins: [] }
      return {
        coins: data.allCoins
      }
    }
  })
)(CoinsList)

export default CoinsListWithData
