import { Html, Head, Main, NextScript } from 'next/document';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

export default function Document() {
  useEffect(() => {
    const tagManagerArgs = {
      gtmId: 'G-BGCLZHPN2P',
      auth: 'dev'
    };

    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#43a047" />
        <link rel="manifest" href="/manifest.json" />
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
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
