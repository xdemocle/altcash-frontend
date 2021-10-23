import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles, Theme } from '@material-ui/core/styles'
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined'
import clsx from 'clsx'
import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
  isSidebarOpen: boolean
}

const MainLinks: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const { isSidebarOpen } = props

  return (
    <List component="nav" className={classes.nav}>
      <Tooltip
        title="Homepage"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem exact component={NavLink} to="/" className={classes.listItem}>
          <ListItemIcon>
            <HomeOutlinedIcon className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Home" className={classes.listItemText} />
        </ListItem>
      </Tooltip>

      <Tooltip
        title="Buy crypto coins"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem component={NavLink} to="/buy" className={classes.listItem}>
          <ListItemIcon>
            <MonetizationOnOutlinedIcon className={classes.icons} />
          </ListItemIcon>
          <ListItemText
            primary="Crypto Coins"
            className={classes.listItemText}
          />
        </ListItem>
      </Tooltip>

      <Tooltip
        title="Your private area"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem
          component={NavLink}
          to="/overview"
          className={classes.listItem}
        >
          <ListItemIcon>
            <StorefrontOutlinedIcon className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Your area" className={classes.listItemText} />
        </ListItem>
      </Tooltip>

      <Tooltip
        title="About Us"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem component={NavLink} to="/about" className={classes.listItem}>
          <ListItemIcon>
            <PeopleAltOutlinedIcon className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="About Us" className={classes.listItemText} />
        </ListItem>
      </Tooltip>
      <Tooltip
        title="Support"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem
          component={NavLink}
          to="/support"
          className={classes.listItem}
        >
          <ListItemIcon>
            <ContactSupportOutlinedIcon className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Support" className={classes.listItemText} />
        </ListItem>
      </Tooltip>
      <Tooltip
        title="Login in your area"
        placement="right"
        enterDelay={isSidebarOpen ? 2000 : 50}
      >
        <ListItem
          component={NavLink}
          to="/login"
          className={clsx(classes.listItem, classes.listItemLast)}
        >
          <ListItemIcon>
            <LockOutlinedIcon className={classes.icons} />
          </ListItemIcon>
          <ListItemText primary="Login" className={classes.listItemText} />
        </ListItem>
      </Tooltip>
    </List>
  )
}

export default MainLinks

const useStyles = makeStyles(({ breakpoints, palette }: Theme) => ({
  nav: {
    position: 'relative',
    display: 'flex',
    height: 'calc(100% - 6rem)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
    // [breakpoints.up('xl')]: {
    //   minHeight: 'auto'
    // }
  },
  icons: {
    marginLeft: '0.5rem',
    color: '#A09EA0',
    '.active &': {
      color: '#fff'
    }
  },
  listItem: {
    position: 'relative',
    paddingLeft: '1.8rem',
    paddingRight: '1.8rem',
    margin: '0.8rem 0',
    height: '3.2rem',
    // color: '#2B3A41',
    '&.active::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '1.45rem',
      width: '3.2rem',
      height: '3.2rem',
      borderRadius: '.6rem',
      backgroundColor: palette.primary.main,
      zIndex: -1
    },
    'a&': {
      textDecoration: 'none',
      color: '#2B3A41'
    }
  },
  listItemText: {
    paddingLeft: '.7rem'
  },
  listItemLast: {
    position: 'absolute',
    bottom: '0'
  }
}))
