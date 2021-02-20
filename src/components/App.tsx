import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'
import blueGrey from '@material-ui/core/colors/blueGrey'
import green from '@material-ui/core/colors/green'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import { Route, Switch } from 'react-router-dom'
import { persistCacheInstance } from '../common/apollo/apollo-cache'
import AboutPage from '../pages/About'
import BuyPage from '../pages/Buy'
import CoinDetailsPage from '../pages/CoinDetails'
import LandingPage from '../pages/Landing'
import OverviewPage from '../pages/Overview'
import SupportPage from '../pages/Support'
import BitcoinRandLivePrice from './BitcoinRandLivePrice'
import BottomNav from './BottomNav'
import Bottombar from './Bottombar'
import Sidebar from './Sidebar'
import TickersLivePrice from './TickersLivePrice'

export const theme = createMuiTheme({
  palette: {
    // type: 'light',
    // type: 'dark',
    primary: {
      // main: '#28a745'
      main: green[600]
    },
    secondary: {
      // main: '#5A7684'
      main: blueGrey[500]
    }
  },
  // spacing: {
  //   unit: 8
  // },
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightMedium: 700
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    minHeight: '100vh'
  },
  content: {
    flexGrow: 1,
    overflow: 'hidden',
    minHeight: 'calc(100vh - 36px)',
    paddingBottom: theme.typography.pxToRem(36),
    [theme.breakpoints.only('xs')]: {
      minHeight: 'calc(100vh - 56px)',
      paddingBottom: theme.typography.pxToRem(56)
    }
  }
}))

const App = () => {
  const classes = useStyles()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const loadCache = async () => {
      /**
       * Enabling the snippet of code below we would activate the cache at first
       * stage of app bootstrap. At moment is deactivated and data is written only
       * after bootstrap and first relevant action, since i'm trying to temporary
       * overcome the current limitation of apollo-cache-persist and have fresh
       * data each reload of the browser.
       */
      try {
        await persistCacheInstance
      } catch (error) {
        console.error('Error restoring Apollo cache', error)
      }

      setLoaded(true)
    }

    loadCache()
  }, [])

  if (!loaded) {
    return <div>Loading...</div>
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BitcoinRandLivePrice />
      <TickersLivePrice />
      <div className={classes.appFrame}>
        <Sidebar />
        <main className={classes.content}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/buy" component={BuyPage} />
            <Route path="/overview" component={OverviewPage} />
            <Route path="/support" component={SupportPage} />
            <Route path="/coin/:coinId" component={CoinDetailsPage} />
          </Switch>
        </main>
        <Hidden xsDown>
          <Bottombar />
        </Hidden>
        <Hidden smUp>
          <BottomNav />
        </Hidden>
      </div>
    </div>
  )
}

export default hot(App)
