// This file is shared across the project
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
// import Divider from '@material-ui/core/Divider'
import {
  ContactSupport,
  Home,
  People
  // ShoppingBasket
} from '@material-ui/icons'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import StoreIcon from '@material-ui/icons/Store'

const styles = {
  nav: {
    padding: 0
  },
  icons: {
    marginLeft: '0.5rem'
  }
}

function MainLinks(props) {
  const { classes, isSidebarOpen } = props

  return (
    <List component="nav" className={classes.nav}>
      <Tooltip
        title="Homepage"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem component={Link} to="/" button>
          <ListItemIcon>
            <Home className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Tooltip>

      <Tooltip
        title="Buy crypto coins"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem component={Link} to="/buy" button>
          <ListItemIcon>
            <MonetizationOnIcon className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Crypto Coins" />
        </ListItem>
      </Tooltip>

      {/* <Divider /> */}

      {/* <Tooltip
        title="Your cart"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem component={Link} to="/cart" button>
          <ListItemIcon>
            <ShoppingBasket className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItem>
      </Tooltip> */}

      <Tooltip
        title="Your balance overview"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem component={Link} to="/overview" button>
          <ListItemIcon>
            <StoreIcon className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>
      </Tooltip>

      {/* <Divider /> */}

      <Tooltip
        title="About Us"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem component={Link} to="/about" button>
          <ListItemIcon>
            <People className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItem>
      </Tooltip>
      <Tooltip
        title="Support"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem component={Link} to="/support" button>
          <ListItemIcon>
            <ContactSupport className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Support" />
        </ListItem>
      </Tooltip>
    </List>
  )
}

MainLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired
}

export default withStyles(styles)(MainLinks)
