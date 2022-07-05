import { ApolloProvider } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import { persistCacheInstance } from '../common/apollo/apollo-cache';
import { apolloClient } from '../common/apollo/apollo-client';
import createEmotionCache from '../common/createEmotionCache';
import { theme } from '../common/theme';
import { isServer } from '../common/utils';
import BitcoinRandLivePrice from '../components/bitcoin-rand-live-price';
import ScrollToTop from '../components/scroll-to-top';
import TickersLivePrice from '../components/tickers-live-price';
// import AuthLayout from '../containers/auth-layout';
import DefaultLayout from '../containers/default-layout';
// import PrivateRoute from '../containers/private-route';
// import AuthProvider from '../context/auth';
import GlobalProvider from '../context/global';
import UserCoinFavouritesProvider from '../context/user-coin-favourites';
import '../styles/global.css';

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}: AppProps & { emotionCache: EmotionCache }) {
  const [loaded, setLoaded] = useState(isServer() ? true : false);

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

    if (!isServer()) {
      loadCache();
    } else {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return <div>Loading Altcash...</div>;
  }

  return (
    <CacheProvider value={emotionCache}>
      <GlobalProvider>
        <UserCoinFavouritesProvider>
          <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
              {/* <AuthProvider> */}
              <Head>
                <title>
                  Altcash | Buy crypto coins fast and easy in South Africa!
                </title>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
              </Head>
              <div>
                <CssBaseline />
                <ScrollToTop />
                {!isServer() && <BitcoinRandLivePrice />}
                <TickersLivePrice />

                <DefaultLayout>
                  <Component {...pageProps} />
                </DefaultLayout>

                <CookieConsent
                  location="bottom"
                  buttonText="Okay"
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
              {/* </AuthProvider> */}
            </ThemeProvider>
          </ApolloProvider>
        </UserCoinFavouritesProvider>
      </GlobalProvider>
    </CacheProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;