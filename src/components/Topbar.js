import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MainLinks from './ListLinks';
import Logo from '../assets/logo.png';

const drawerWidth = '17rem';

const styles = theme => ({
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    padding: '0 .8rem',
    [theme.breakpoints.only('xs')]: {
      padding: '0 .2rem',
    },
    ...theme.mixins.toolbar,
  },
  toolbarTitle: {
    margin: '0 1.2rem',
    [theme.breakpoints.only('xs')]: {
      margin: '0 1.1rem',
    }
  },
  buttonLogoNormal: {
    backgroundColor: 'transparent !important'
  }
});

class Topbar extends Component {
  state = {
    open: false
  }

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { classes } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
        }}
        open={this.state.open}
      >
        <div className={classes.toolbar}>
          <IconButton disableRipple={!this.state.open && true} onClick={this.handleDrawerToggle} color="inherit" aria-label="toggle drawer" className={classNames(!this.state.open && classes.buttonLogoNormal)}>
            <Icon className={classNames(!this.state.open && classes.hide)}>chevron_left</Icon>
            <img src={Logo} alt="logo.png" width="48" className={classNames(this.state.open && classes.hide)} />
          </IconButton>
          <Typography variant="subheading" color="inherit" className={classes.toolbarTitle}>
            Altcoins Sale
          </Typography>
        </div>
        <Divider />
        <MainLinks />
      </Drawer>
    );
  }
}

Topbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Topbar);