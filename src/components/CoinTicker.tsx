import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import React from 'react'
import { btcToRandPrice } from '../common/currency'
import useGlobal from '../common/globalStateHook'
import { GET_TICKER } from '../graphql/queries'

const CoinTicker = ({ coin }) => {
  const [globalState] = useGlobal()
  const { data } = useQuery(GET_TICKER, {
    fetchPolicy: 'cache-first',
    variables: {
      id: coin && coin.id
    }
  })

  if (!coin) {
    return null
  }

  // console.log(
  //   // 'summary' + coin.name,
  //   data && data.ticker.askRate
  // )

  const dataTicker = data ? data.ticker : {}

  return (
    <span>
      {dataTicker.askRate && globalState.bitcoinRandPrice
        ? btcToRandPrice(dataTicker.askRate, globalState.bitcoinRandPrice)
        : 'n/d'}
    </span>
  )
}

CoinTicker.propTypes = {
  coin: PropTypes.object.isRequired
}

export default CoinTicker
