import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import green from '@material-ui/core/colors/green'
import { Favorite, List as ListIcon } from '@material-ui/icons'
// import useGlobal from '../../common/globalStateHook'
import CoinsList from './CoinsList'
import CoinsUserFavourites from './CoinsUserFavourites'

const styles = (theme) => ({
  root: {
    padding: theme.typography.pxToRem(theme.spacing(3)),
    [theme.breakpoints.only('xs')]: {
      padding: theme.typography.pxToRem(theme.spacing(1.5))
    }
  },
  title: {
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center'
    }
  },
  buttonLoadMore: {
    margin: '0 auto'
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  bottomListWrapper: {
    position: 'relative',
    textAlign: 'center',
    margin: theme.spacing(1)
  },
  paper: {
    margin: '1rem 0'
  },
  tabRoot: {
    maxWidth: 'none',
    minWidth: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0
  }
})

const BuyTabPage = (props) => {
  const { classes } = props
  // const [globalState, globalActions] = useGlobal()
  const [tab, setTab] = useState(0)

  const handleChange = (event, tab) => {
    setTab(tab)
  }

  return (
    <div className={classes.root}>
      <Typography
        color="primary"
        variant="h4"
        gutterBottom
        className={classes.title}
      >
        Crypto Coins
      </Typography>

      <Paper className={classes.paper}>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label="Coin List"
            icon={<ListIcon />}
            classes={{ root: classes.tabRoot }}
          />
          <Tab
            label="Favourite"
            icon={<Favorite />}
            classes={{ root: classes.tabRoot }}
          />
        </Tabs>
      </Paper>

      {tab === 0 && <CoinsList />}
      {tab === 1 && <CoinsUserFavourites />}
    </div>
  )
}

BuyTabPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(BuyTabPage)
