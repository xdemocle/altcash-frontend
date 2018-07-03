import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import Bottombar from './Bottombar';

import Landing from '../components/Landing/Landing';
import About from '../components/About/About';

const theme = createMuiTheme({
  palette: {
    // type: 'light',
    // type: 'dark',
    primary: {
      main: '#28a745'
    },
    secondary: {
      main: '#5A7684'
      // main: '#F1C40F'
    }
  },
  typography: {
    fontFamily: "\"Montserrat\", \"Helvetica\", \"Arial\", sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightMedium: 700
   }
})

const styles = theme => ({
  root: {
    flexGrow: 1,
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
      paddingBottom: theme.typography.pxToRem('56'),
      // marginLeft: 0
    },
  },
})

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className={classes.root}>
            <CssBaseline />
            <div className={classes.appFrame}>

              <Sidebar />

              <main className={classes.content}>
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route path="/about" component={About} />
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
        </Router>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
