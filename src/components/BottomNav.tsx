import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { ContactSupport, Home } from '@material-ui/icons'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import StoreIcon from '@material-ui/icons/Store'
import React, { useState, ChangeEvent } from 'react'
import { useHistory } from 'react-router-dom'

const SimpleBottomNavigation: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const [pathname, setPathname] = useState(history.location.pathname)

  const handleChange = (event: ChangeEvent<unknown>, newValue: string) => {
    history.push(newValue)
    setPathname(newValue)
  }

  return (
    <BottomNavigation
      value={pathname}
      onChange={handleChange}
      className={classes.root}
      showLabels
    >
      <BottomNavigationAction label="Home" icon={<Home />} value="/" />
      <BottomNavigationAction
        label="Buy"
        icon={<MonetizationOnIcon />}
        value="/buy"
      />
      <BottomNavigationAction
        label="Overview"
        icon={<StoreIcon />}
        value="/overview"
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

export default SimpleBottomNavigation

const useStyles = makeStyles(({ breakpoints, typography, spacing }: Theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  }
}))
