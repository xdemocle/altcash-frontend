import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import {
  ContactSupport,
  Home,
  // People,
  ShoppingBasket
} from '@material-ui/icons'

const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  }
}

class SimpleBottomNavigation extends React.Component {
  state = {
    value: this.props.location.pathname
  }

  handleChange = (event, value) => {
    this.props.history.push(value)
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Home" icon={<Home />} value="/" />
        <BottomNavigationAction
          label="Buy"
          icon={<ShoppingBasket />}
          value="/buy"
        />
        <BottomNavigationAction
          label="Support"
          icon={<ContactSupport />}
          value="/support"
        />
        {/* <BottomNavigationAction
          label="About"
          icon={<People />}
          value="/about"
        /> */}
      </BottomNavigation>
    )
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default withStyles(styles)(withRouter(SimpleBottomNavigation))
