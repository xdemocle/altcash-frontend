// This file is shared across the project
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import Tooltip from '@material-ui/core/Tooltip'
import Divider from '@material-ui/core/Divider'

const styles = {
  // popper: {
  //   'left': '0rem !important'
  // }
  nav: {
    padding: 0
  }
}

function MainLinks(props) {
  const { classes } = props

  return (
    <List component="nav" className={classes.nav}>
      <Tooltip title="Homepage" placement="right">
        <ListItem component={Link} to="/" button>
          <ListItemIcon>
            <Icon>home</Icon>
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Tooltip>

      <Tooltip title="Buy crypto coins" placement="right">
        <ListItem component={Link} to="/buy" button>
          <ListItemIcon>
            <Icon>shopping_basket</Icon>
          </ListItemIcon>
          <ListItemText primary="Buy Crypto Coins" />
        </ListItem>
      </Tooltip>

      <Divider />

      <Tooltip title="About Us" placement="right">
        <ListItem component={Link} to="/about" button>
          <ListItemIcon>
            <Icon>people</Icon>
          </ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItem>
      </Tooltip>

      <Tooltip title="Support" placement="right">
        <ListItem component={Link} to="/support" button>
          <ListItemIcon>
            <Icon>contact_support</Icon>
          </ListItemIcon>
          <ListItemText primary="Support" />
        </ListItem>
      </Tooltip>
    </List>
  )
}

MainLinks.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MainLinks)
