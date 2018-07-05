/* eslint-disable no-debugger */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import Tooltip from '@material-ui/core/Tooltip'
import { graphql } from 'react-apollo'
import { UPDATE_IS_SIDEBAR_OPEN } from '../graphql/mutations.js'
import { GET_APP } from '../graphql/queries.js'
import MainLinks from './ListLinks'
import Logo from '../assets/logo.png'

const drawerWidth = '17rem'

const styles = theme => ({
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    height: '100%',
    width: drawerWidth,
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    position: 'fixed',
    overflow: 'hidden',
    width: theme.typography.pxToRem('72'),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  toolbarOpen: {
    width: drawerWidth
  },
  toolbarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    padding: '0 .8rem',
    [theme.breakpoints.only('xs')]: {
      padding: '0 .2rem'
    },
    ...theme.mixins.toolbar
  },
  toolbarTitle: {
    margin: '0 1.2rem',
    [theme.breakpoints.only('xs')]: {
      margin: '0 1.1rem'
    }
  },
  buttonLogoNormal: {
    backgroundColor: 'transparent !important'
  }
})

class Sidebar extends Component {
  componentDidMount() {
    if (isWidthDown('md', this.props.width)) {
      this.props.updateIsSidebarOpen(false)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      if (isWidthDown('md', nextProps.width)) {
        this.props.updateIsSidebarOpen(false)
      } else {
        this.props.updateIsSidebarOpen(true)
      }
    }
  }

  handleDrawerToggle = () => {
    this.props.updateIsSidebarOpen(!this.props.app.isSidebarOpen)
  }

  render() {
    const { classes } = this.props

    return (
      <Hidden xsDown>
        <Drawer
          variant="permanent"
          anchor="left"
          classes={{
            paper: classNames(classes.drawerPaper, !this.props.app.isSidebarOpen && classes.drawerPaperClose)
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          open={this.props.app.isSidebarOpen}
        >
          <div className={classNames(classes.toolbar, this.props.app.isSidebarOpen && classes.toolbarOpen)}>
            <Tooltip title={`${this.props.app.isSidebarOpen ? 'Collapse' : 'Expand'} sidebar`} placement="right">
              <div className={classes.toolbarHeader}>
                <IconButton disableRipple onClick={this.handleDrawerToggle} aria-label="toggle drawer" className={classNames(classes.buttonLogoNormal)}>
                  <img src={Logo} alt="logo.png" width="48" />
                </IconButton>
                <Typography variant="subheading" className={classes.toolbarTitle}>
                  Altcoins Sale
                </Typography>
              </div>
            </Tooltip>
            <Divider />
            <MainLinks />
          </div>
        </Drawer>
      </Hidden>
    )
  }
}

Sidebar.propTypes = {
  updateIsSidebarOpen: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
}

const SidebarEnhanced = compose(
  withWidth(),
  withStyles(styles, { withTheme: true }),
  graphql(UPDATE_IS_SIDEBAR_OPEN, {
    props: ({ mutate }) => ({
      updateIsSidebarOpen: isSidebarOpen => mutate({ variables: { isSidebarOpen } })
    })
  }),
  graphql(GET_APP, {
    props: ({ data: { app } }) => {
      return {
        app
      }
    }
  })
)(Sidebar)

export default SidebarEnhanced
