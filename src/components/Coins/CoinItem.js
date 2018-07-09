/* eslint-disable no-debugger */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
  avatar: {
    width: 32,
    height: 32,
    overflow: 'visible'
  },
  bigAvatar: {
    padding: 0
  },
  column: {
    flexBasis: 0
  }
})

const svgIcons = require.context('../../../node_modules/cryptocoins-icons/SVG', true, /.*\.svg$/)
const svgPathHelper = (name) => svgIcons(name, true)

const CoinItem = ({ classes, coin }) => {
  let svgPath = null

  try {
    svgPath = svgPathHelper(`./${coin.symbol.toUpperCase()}.svg`)
  } catch (err) {
    svgPath = svgPathHelper(`./BTC-alt.svg`)
  }

  return (
    <ListItem button>
      <ListItemIcon>
        <Avatar
          src={svgPath}
          className={classNames(classes.avatar, classes.bigAvatar)}
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
          <Icon>shopping_cart</Icon>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

CoinItem.propTypes = {
  classes: PropTypes.object.isRequired,
  coin: PropTypes.object.isRequired
}

export default withStyles(styles)(CoinItem)
