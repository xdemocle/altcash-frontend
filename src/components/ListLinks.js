// This file is shared across the project
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

// import route Components here
import {
    // BrowserRouter as Router,
    // Route,
    Link,
    // Switch,
    // Redirect
  } from 'react-router-dom'

const styles = {
  popper: {
    'left': '6rem !important'
  }
}

function MainLinks(props) {
  const { classes } = props;

  return (
    <List component="nav">
      <Tooltip title="Homepage" placement="left" classes={classes}>
        <ListItem component={Link} to="/" button>
          <ListItemIcon>
            <Icon>home</Icon>
          </ListItemIcon>
          <ListItemText disableTypography primary="Home" />
        </ListItem>
      </Tooltip>

      <Tooltip title="About Us" placement="left" classes={classes}>
        <ListItem component={Link} to="/about" button>
          <ListItemIcon>
            <Icon>people</Icon>
          </ListItemIcon>
          <ListItemText disableTypography primary="About Us" />
        </ListItem>
      </Tooltip>
    </List>
  );
}

MainLinks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLinks);