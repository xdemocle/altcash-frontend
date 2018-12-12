const bittrex = require('node-bittrex-api')
const app = require('http').createServer()
const io = require('socket.io')(app, {
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
})

let socketClient = null

io.on('connection', (socket) => {
  socketClient = socket
  socket.emit('connected', true)
})

app.listen(8000)

// const API_KEY = 'c011365f4a9e4c23a4c739f9833ab901'
// const API_SECRET = '51182af945b84de09e7481ca18fd27a0'

// bittrex.options({
//   apikey: API_KEY,
//   apisecret: API_SECRET,
//   verbose: true,
//   cleartext: false
// })

bittrex.websockets.client(function() {
  console.log('Bittrex websocket connected')

  bittrex.websockets.listen(function(data) {
    if (data.M === 'updateSummaryState') {
      socketClient.emit('m', {
        markets: data.A[0].Deltas
      })
    }
  })
})
