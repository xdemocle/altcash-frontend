import { CssBaseline } from '@mui/material';
import { lazy, Suspense, useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import { Route, Routes } from 'react-router-dom';
import { persistCacheInstance } from '../../common/apollo/apollo-cache';
import BitcoinRandLivePrice from '../../components/bitcoin-rand-live-price';
import ScrollToTop from '../../components/scroll-to-top';
import TickersLivePrice from '../../components/tickers-live-price';
import AuthProvider from '../../context/auth';
import { CustomBuyRouter } from '../../pages/buy';
import AuthLayout from '../auth-layout';
import DefaultLayout from '../default-layout';
import PrivateRoute from '../private-route';
import useStyles from './use-styles';

const AboutPage = lazy(() => import('../../pages/about'));
const BuyPage = lazy(() => import('../../pages/buy'));
const CoinDetailsPage = lazy(() => import('../../pages/coin-details'));
const LandingPage = lazy(() => import('../../pages/landing'));
const LoginPage = lazy(() => import('../../pages/login'));
const OverviewPage = lazy(() => import('../../pages/overview'));
const SignupPage = lazy(() => import('../../pages/signup'));
const SupportPage = lazy(() => import('../../pages/support'));

const App = () => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);

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
        await persistCacheInstance;
      } catch (error) {
        console.error('Error restoring Apollo cache', error);
      }

      setLoaded(true);
    };

    loadCache();
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <div className={classes.root}>
        <CssBaseline />
        <ScrollToTop />
        <BitcoinRandLivePrice />
        <TickersLivePrice />

        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<>...</>}>
                  <LandingPage />
                </Suspense>
              }
            />
            <Route
              path="about"
              element={
                <Suspense fallback={<>...</>}>
                  <AboutPage />
                </Suspense>
              }
            />
            <Route path="buy" element={<CustomBuyRouter />} />
            <Route
              path="buy/:slug"
              element={
                <Suspense fallback={<>...</>}>
                  <BuyPage />
                </Suspense>
              }
            />
            <Route
              path="support"
              element={
                <Suspense fallback={<>...</>}>
                  <SupportPage />
                </Suspense>
              }
            />
            <Route
              path="login"
              element={
                <Suspense fallback={<>...</>}>
                  <LoginPage />
                </Suspense>
              }
            />
            <Route
              path="coin/:coinId"
              element={
                <Suspense fallback={<>...</>}>
                  <CoinDetailsPage />
                </Suspense>
              }
            />
            <Route
              path="overview"
              element={
                <Suspense fallback={<>...</>}>
                  <PrivateRoute>
                    <OverviewPage />
                  </PrivateRoute>
                </Suspense>
              }
            />
          </Route>

          <Route
            path="/signup"
            element={
              <Suspense fallback={<>...</>}>
                <AuthLayout>
                  <SignupPage />
                </AuthLayout>
              </Suspense>
            }
          />

          <Route element={<div>404 - Not Found</div>}></Route>
        </Routes>

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
  );
};

export default App;
