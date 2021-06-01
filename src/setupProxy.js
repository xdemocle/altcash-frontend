// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: process.env.REACT_APP_GRAPHQL_SERVER ||  'http://localhost:4000',
      changeOrigin: true
    })
  )

  // app.use(
  //   '/signalr',
  //   createProxyMiddleware({
  //     target: 'wss://socket-v3.bittrex.com/signalr',
  //     ws: true
  //   })
  // )
}
