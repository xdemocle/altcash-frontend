/**
 *  Bittrex websocket
 */
import io from 'socket.io-client'

const URI = 'http://localhost:8000'

let socket = {}

const socketConnect = (callback) => {
  socket = io(URI)

  if (callback) {
    callback()
  }

  return socket
}

export {
  socket,
  socketConnect
}
