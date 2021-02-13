import React from 'react'
import PropTypes from 'prop-types'
// import { graphql, compose } from '@apollo/client'
// import { UPDATE_MARKET } from '../../graphql/mutations.js'
import { socket, socketConnect } from '../../common/BittrexWebsocketClient'

class TickersLivePrice extends React.Component {
  componentDidMount() {
    // const that = this

    socketConnect(() => {
      socket.on('connected', (isConnected) => {
        if (isConnected) {
          socket.on('m', (data) => {
            console.log('m', data)
            // if (data.markets) {
            //   that.updateMarkets(data.markets)
            // }
          })
        }
      })
    })
  }

  updateMarkets(markets) {
    const { updateMarket } = this.props
    markets.forEach((market) => updateMarket(market))
  }

  componentWillUnmount() {
    if (socket && socket.disconnect) {
      socket.disconnect()
    }
  }

  render() {
    return null
  }
}

TickersLivePrice.propTypes = {
  updateMarket: PropTypes.func.isRequired
}

// const TickersLivePriceEnhanced = compose(
//   graphql(UPDATE_MARKET, {
//     props: ({ mutate }) => ({
//       updateMarket: (market) => mutate({ variables: { market } })
//     })
//   })
// )(TickersLivePrice)

export default TickersLivePrice
