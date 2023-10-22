import { ApolloProvider } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { HighlightInit } from '@highlight-run/next/client';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import { persistCacheInstance } from '../common/apollo/apollo-cache';
import { apolloClient } from '../common/apollo/apollo-client';
import { HIGHLIGHT_NEXTJS_APP } from '../common/constants';
import * as ga from '../common/ga';
import { theme } from '../common/theme';
import { isServer } from '../common/utils';
import BitcoinRandLivePrice from '../components/atoms/bitcoin-rand-live-price';
import ScrollToTop from '../components/atoms/scroll-to-top';
import TickersLivePrice from '../components/molecules/tickers-live-price';
import DefaultLayout from '../components/templates/default-layout';
import UserCoinFavouritesProvider from '../context/favourites';
import GlobalProvider from '../context/global';
import { clientSideEmotionCache } from './_app';

export function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}: AppProps & { emotionCache: EmotionCache }) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(isServer() ? true : false);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
    <>
      <HighlightInit
        projectId={HIGHLIGHT_PROJECT_ID}
        serviceName={HIGHLIGHT_NEXTJS_APP}
        tracingOrigins
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
          urlBlocklist: []
        }}
      />

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
    </>
  );
}
