import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import { Html, Head, Main, NextScript } from 'next/document';
import TagManager from 'react-gtm-module';
import { apolloClient } from '../common/apollo/apollo-client';
import { theme } from '../common/theme';
import GlobalProvider from '../context/global';
import UserCoinFavouritesProvider from '../context/user-coin-favourites';

export default function Document() {
  const tagManagerArgs = {
    gtmId: 'G-BGCLZHPN2P',
    auth: 'dev'
  };

  TagManager.initialize(tagManagerArgs);

  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#43a047" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat:300,500,700&display=swap"
        />
        <meta
          name="description"
          content="Buy crypto coins fast and easy in South Africa!"
        />
        <meta
          name="keywords"
          content="buy, crypto, coins, fast and easy, bitcoins, altcoins, South Africa"
        />
      </Head>
      <body className="root">
        <GlobalProvider>
          <UserCoinFavouritesProvider>
            <ApolloProvider client={apolloClient}>
              <ThemeProvider theme={theme}>
                <Main />
              </ThemeProvider>
            </ApolloProvider>
          </UserCoinFavouritesProvider>
        </GlobalProvider>
        <NextScript />
      </body>
    </Html>
  );
}
