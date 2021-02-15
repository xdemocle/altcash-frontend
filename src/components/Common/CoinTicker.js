import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import { GET_TICKER } from '../../graphql/queries'
import useGlobal from '../../common/globalStateHook'
import { btcToRandPrice } from '../../common/currency'

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
