const { createProxyMiddleware } = require('http-proxy-middleware')

// eslint-disable-next-line space-before-function-paren
module.exports = function (app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'http://localhost:4000',
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
