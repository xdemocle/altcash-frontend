import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles, Theme } from '@material-ui/core/styles'
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined'
import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
  isSidebarOpen: boolean
}

function MainLinks(props: Props) {
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
        title="Your balance overview"
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
          <ListItemText primary="Overview" className={classes.listItemText} />
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
    </List>
  )
}

export default MainLinks

const useStyles = makeStyles(({ breakpoints, palette }: Theme) => ({
  nav: {
    display: 'flex',
    minHeight: 'calc(100vh - 6rem)',
    // height: 'calc(100vh - 12rem)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
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
    color: '#2B3A41',
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
    [breakpoints.down('md')]: {
      margin: '0.3rem 0'
    }
  },
  listItemText: {
    paddingLeft: '.7rem'
  }
}))
