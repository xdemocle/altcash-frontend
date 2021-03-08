import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, Theme } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import CookieConsent from 'react-cookie-consent'
import { hot } from 'react-hot-loader/root'
import { Route, Switch } from 'react-router-dom'
import { persistCacheInstance } from '../common/apollo/apollo-cache'
import BitcoinRandLivePrice from '../components/BitcoinRandLivePrice'
import ScrollToTop from '../components/ScrollToTop'
import TickersLivePrice from '../components/TickersLivePrice'
import AuthProvider from '../context/AuthProvider'
import AboutPage from '../pages/About'
import BuyPage from '../pages/Buy'
import CoinDetailsPage from '../pages/CoinDetails'
import LandingPage from '../pages/Landing'
import LoginPage from '../pages/Login'
import OverviewPage from '../pages/Overview'
import SignupPage from '../pages/Signup'
import SupportPage from '../pages/Support'
import AuthLayout from './AuthLayout'
import DefaultLayout from './DefaultLayout'
import PrivateRoute from './PrivateRoute'

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
    <AuthProvider>
      <div className={classes.root}>
        <CssBaseline />
        <ScrollToTop />
        <BitcoinRandLivePrice />
        <TickersLivePrice />

        <Switch>
          <Route path={['/signup']} exact>
            <AuthLayout>
              <Route exact path="/signup" component={SignupPage} />
            </AuthLayout>
          </Route>

          <Route
            path={[
              '/',
              '/about',
              '/buy',
              '/support',
              '/login',
              '/coin/:coinId',
              '/overview'
            ]}
            exact
          >
            <DefaultLayout>
              <Route exact path="/" component={LandingPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/buy" component={BuyPage} />
              <Route path="/support" component={SupportPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/coin/:coinId" component={CoinDetailsPage} />
              <PrivateRoute exact path={['/overview']}>
                <Route path="/overview" component={OverviewPage} />
              </PrivateRoute>
            </DefaultLayout>
          </Route>

          <Route component={() => <div>404 - Not Found</div>}></Route>
        </Switch>

        <CookieConsent
          location="bottom"
          buttonText="Okay!!!"
          cookieName="CookiePrivacySA"
          style={{ background: '#2B373B' }}
          buttonStyle={{
            color: '#ffffff',
            background: '#28a745',
            fontSize: '13px',
            font: 'inherit',
            textTransform: 'uppercase',
            fontWeight: '700',
            borderRadius: '.25rem'
          }}
          expires={150}
        >
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </div>
    </AuthProvider>
  )
}

export default hot(App)

const useStyles = makeStyles(({ breakpoints, typography }: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#e3e4e9'
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    margin: '0 auto',
    [breakpoints.up('xl')]: {
      padding: '3rem 6rem 6rem 6rem',
      height: 'calc(100vh - 12rem)',
      maxWidth: '100rem'
    }
  },
  inner: {
    display: 'flex',
    [breakpoints.up('xl')]: {
      overflow: 'hidden',
      minHeight: 'calc(100vh - 9rem)',
      maxHeight: 'calc(100vh - 9rem)',
      borderRadius: '1.5rem',
      boxShadow: '0 0.25rem 1rem rgba(0,0,0,0.15)'
    }
  },
  content: {
    position: 'relative',
    flexGrow: 1,
    overflow: 'hidden',
    minHeight: 'calc(100vh - 36px)',
    paddingBottom: typography.pxToRem(36),
    backgroundColor: '#f4f5f4',
    [breakpoints.only('xs')]: {
      minHeight: 'calc(100vh - 56px)',
      paddingBottom: typography.pxToRem(56)
    },
    [breakpoints.up('xl')]: {
      overflowY: 'auto',
      minHeight: 'auto'
    }
  }
}))
