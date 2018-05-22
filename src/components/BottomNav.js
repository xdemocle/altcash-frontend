import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  }
}

class SimpleBottomNavigation extends React.Component {
  state = {
    value: this.props.location.pathname
  };

  handleChange = (event, value) => {
    this.props.history.push(value)
    this.setState({ value })
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Home" icon={<Icon>home</Icon>} value="/" />
        <BottomNavigationAction label="Buy" icon={<Icon>shopping_basket</Icon>} value="/buy" />
        <BottomNavigationAction label="Support" icon={<Icon>contact_support</Icon>} value="/support" />
        {/* <BottomNavigationAction label="About" icon={<Icon>people</Icon>} value="/about" /> */}
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SimpleBottomNavigation));

