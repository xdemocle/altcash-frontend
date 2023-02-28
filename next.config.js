module.exports = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  images: {
    domains: [
      's2.coinmarketcap.com',
      'bittrexblobstorage.blob.core.windows.net'
    ]
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: process.env.NEXT_PUBLIC_GRAPHQL_SERVER + '/graphql'
      }
    ];
  }
};
