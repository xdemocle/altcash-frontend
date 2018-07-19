import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from 'react-apollo'
import apolloClient from '../graphql/apollo-client'
import { persistCacheInstance } from '../graphql/apollo-cache'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import blueGrey from '@material-ui/core/colors/blueGrey'
import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'
import ScrollToTop from './ScrollToTop'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import Bottombar from './Bottombar'

import Landing from '../components/Landing/Landing'
import About from '../components/About/About'
import CoinsList from '../components/Coins/CoinsList'

const theme = createMuiTheme({
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

const styles = theme => ({
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
})

class App extends Component {
  state = {
    loaded: false
  }

  async componentDidMount() {
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

    this.setState({
      loaded: true
    })
  }

  render() {
    const { classes } = this.props

    if (!this.state.loaded) {
      return <div>Loading...</div>
    }

    return (
      <ApolloProvider client={apolloClient}>
        <MuiThemeProvider theme={theme}>
          <Router basename={'/stealth-stack'}>
            <ScrollToTop>
              <div className={classes.root}>
                <CssBaseline />
                <div className={classes.appFrame}>

                  <Sidebar />

                  <main className={classes.content}>
                    <Switch>
                      <Route exact path="/" component={Landing} />
                      <Route path="/about" component={About} />
                      <Route path="/buy" component={CoinsList} />
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
          </Router>
        </MuiThemeProvider>
      </ApolloProvider>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(App)
