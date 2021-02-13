import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import { GET_TICKER } from '../../graphql/queries'
import useGlobal from '../../common/globalStateHook'

const CoinTicker = ({ coin }) => {
  const [globalState] = useGlobal()
  const { data: dataTicker } = useQuery(GET_TICKER, {
    fetchPolicy: 'cache-first',
    variables: {
      id: coin && coin.id
    }
  })

  if (!coin) {
    return null
  }

  // console.log(
  //   'summary' + coin.name,
  //   dataTicker && dataTicker.ticker.lastTradeRate
  // )

  const num =
    dataTicker && dataTicker.ticker.lastTradeRate * globalState.bitcoinRandPrice
  const randPrice = num && num.toFixed(2)

  return <span>{dataTicker ? `R${randPrice}` : 'R0'}</span>
}

CoinTicker.propTypes = {
  coin: PropTypes.object.isRequired
}

export default CoinTicker
