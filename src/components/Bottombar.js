import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: 'auto',
    boxShadow: 'none',
    padding: '.5rem 1.5rem',
    marginLeft: '4.56rem',
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0
    },
  }
});

function SimpleAppBar(props) {
  const { classes } = props;
  return (
    <AppBar position="static" color="secondary" className={classes.root}>
      <Typography variant="body1" color="inherit" align="right">
        &copy; Alts.sale { new Date().getFullYear() }
      </Typography>
    </AppBar>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SimpleAppBar);