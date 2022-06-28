import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import TagManager from 'react-gtm-module';
import { BrowserRouter } from 'react-router-dom';
import { apolloClient } from './common/apollo/apollo-client';
import { theme } from './common/theme';
import App from './containers/app';
import GlobalProvider from './context/global';
import UserCoinFavouritesProvider from './context/user-coin-favourites';
import './index.css';

const tagManagerArgs = {
  gtmId: 'G-BGCLZHPN2P',
  auth: 'dev'
};

TagManager.initialize(tagManagerArgs);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as HTMLElement);

// add .root class for global styles overwrites
if (rootElement) {
  rootElement.className = 'root';
}

root.render(
  <BrowserRouter>
    <GlobalProvider>
      <UserCoinFavouritesProvider>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ApolloProvider>
      </UserCoinFavouritesProvider>
    </GlobalProvider>
  </BrowserRouter>
);
