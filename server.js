const express = require('express')
const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware')
const fallback = require('express-history-api-fallback')

const root = `${__dirname}/build`
app.use(express.static(root))

// add proxy
app.use(
  '/graphql',
  createProxyMiddleware({
    target: 'http://localhost:4000/',
    changeOrigin: true
  })
)

// history fallback
app.use(fallback('index.html', { root }))

let port = process.argv[2] // get port from command line argument
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server is listening on port ${port}`))
