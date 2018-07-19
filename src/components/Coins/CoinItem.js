/* eslint-disable no-debugger */
import { filter } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import ReactSVG from 'react-svg'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  avatar: {
    width: '2rem',
    height: '2rem',
    padding: 0,
    verticalAlign: 'middle',
    overflow: 'visible'
  },
  column: {
    flexBasis: 0
  }
})

const svgCoinIcons = require.context('../../../node_modules/cryptocoins-icons/SVG', true, /.*\.svg$/)
const svgCoinPathHelper = (name) => svgCoinIcons(name, true)
const isCoinActiveHelper = (markets) => {
  const actives = filter(markets, (market) => {
    return market.isActive
  })

  return actives.length > 0
}

const CoinItem = ({ classes, coin }) => {
  let coinSymbol = null
  let svgCoinPath = null
  const isCoinActive = isCoinActiveHelper(coin.markets)

  if (!isCoinActive) {
    return null
  }

  try {
    coinSymbol = coin.symbol.toUpperCase()
    svgCoinPath = svgCoinPathHelper(`./${coinSymbol}.svg`)
  } catch (err) {
    coinSymbol = 'cc-default'
    svgCoinPath = svgCoinPathHelper(`./BTC-alt.svg`)
  }

  return (
    <React.Fragment>
      <ListItem button>
        <ListItemIcon>
          <ReactSVG
            path={svgCoinPath}
            svgClassName={classNames(classes.avatar, coinSymbol)}
          />
        </ListItemIcon>
        <ListItemText
          primary={coin.name}
          secondary={coin.symbol.toUpperCase()}
          className={classes.column}
        />
        <ListItemText
          primary="R1502"
          secondary="Live Price"
          className={classes.column}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Add cart">
            <Icon>favorite</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <li>
        <Divider />
      </li>
    </React.Fragment>
  )
}

CoinItem.propTypes = {
  classes: PropTypes.object.isRequired,
  coin: PropTypes.object.isRequired
}

export default withStyles(styles)(CoinItem)
