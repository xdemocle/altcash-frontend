import React, { useEffect, useState } from 'react'
import { persistCacheInstance } from '../common/apollo/apollo-cache'
import { Route, Switch } from 'react-router-dom'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import blueGrey from '@material-ui/core/colors/blueGrey'
import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'
import ScrollToTop from './Common/ScrollToTop'
import Sidebar from './Layout/Sidebar'
import BottomNav from './Layout/BottomNav'
import Bottombar from './Layout/Bottombar'
import TickersLivePrice from './Common/TickersLivePrice'
import BitcoinRandLivePrice from './Common/BitcoinRandLivePrice'
import Landing from '../components/Landing/Landing'
import About from '../components/About/About'
import BuyTabPage from '../components/Coins/BuyTabPage'
// import Cart from '../components/Cart'
import Overview from '../components/Overview'
import Support from '../components/Support'
import CoinPage from '../components/Coins/CoinPage'

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
    paddingBottom: theme.typography.pxToRem('36'),
    // marginLeft: theme.typography.pxToRem('72'),
    [theme.breakpoints.only('xs')]: {
      minHeight: 'calc(100vh - 56px)',
      paddingBottom: theme.typography.pxToRem('56')
      // marginLeft: 0
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
    <ScrollToTop>
      <div className={classes.root}>
        <CssBaseline />
        <BitcoinRandLivePrice />
        <TickersLivePrice />
        <div className={classes.appFrame}>
          <Sidebar />
          <main className={classes.content}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/about" component={About} />
              <Route path="/buy" component={BuyTabPage} />
              {/* <Route path="/cart" component={Cart} /> */}
              <Route path="/overview" component={Overview} />
              <Route path="/support" component={Support} />
              <Route path="/coin/:coinId" component={CoinPage} />
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
    </ScrollToTop>
  )
}

export default App
