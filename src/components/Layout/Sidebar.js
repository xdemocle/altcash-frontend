import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTheme, withStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { isWidthDown } from '@material-ui/core/withWidth'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import Tooltip from '@material-ui/core/Tooltip'
import MainLinks from './ListLinks'
import Logo from '../../assets/logo.png'
import useGlobal from '../../common/globalStateHook'

const drawerWidth = '17rem'

const styles = (theme) => ({
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
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
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
    padding: 0,
    backgroundColor: 'transparent !important'
  }
})

function useWidth() {
  const theme = useTheme()
  const keys = [...theme.breakpoints.keys].reverse()
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key))
      return !output && matches ? key : output
    }, null) || 'xs'
  )
}

const Sidebar = (props) => {
  const { classes } = props
  const width = useWidth()
  const [globalState, globalActions] = useGlobal()

  useEffect(() => {
    if (isWidthDown('md', width)) {
      globalActions.updateIsSidebarOpen(false)
    } else {
      globalActions.updateIsSidebarOpen(true)
    }
  }, [globalActions, width])

  const handleDrawerToggle = () => {
    globalActions.updateIsSidebarOpen(!globalState.isSidebarOpen)
  }

  return (
    <Hidden xsDown>
      <Drawer
        variant="permanent"
        anchor="left"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !globalState.isSidebarOpen && classes.drawerPaperClose
          )
        }}
        ModalProps={{
          // Better open performance on mobile.
          keepMounted: true
        }}
        open={globalState.isSidebarOpen}
      >
        <div
          className={classNames(
            classes.toolbar,
            globalState.isSidebarOpen && classes.toolbarOpen
          )}
        >
          <Tooltip
            title={`${
              globalState.isSidebarOpen ? 'Collapse' : 'Expand'
            } sidebar`}
            placement="right"
          >
            <div className={classes.toolbarHeader}>
              <IconButton
                disableRipple
                onClick={handleDrawerToggle}
                aria-label="toggle drawer"
                className={classNames(classes.buttonLogoNormal)}
              >
                <img src={Logo} alt="logo.png" width="48" />
              </IconButton>
              <Typography variant="subtitle1" className={classes.toolbarTitle}>
                Altcash
              </Typography>
            </div>
          </Tooltip>
          <Divider />
          <MainLinks isSidebarOpen={globalState.isSidebarOpen} />
        </div>
      </Drawer>
    </Hidden>
  )
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Sidebar)
