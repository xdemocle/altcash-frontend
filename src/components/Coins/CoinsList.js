/* eslint-disable no-debugger */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { graphql } from 'react-apollo'
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
    const { coins, classes, theme } = this.props
    const { dense } = this.state

    console.log(theme.palette)

    return (
      <div className={classes.root}>
        <h1 className={styles.primaryText}>Coins available</h1>
        <List dense={dense}>
          {coins.map((coin, index) => (
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <Icon>folder</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={coin.name}
                secondary={coin.symbol}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Add cart">
                  <Icon>shopping_cart</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

CoinsList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
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
