import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import { GET_TICKER } from '../../graphql/queries'
import useGlobal from '../../common/globalStateHook'

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
  //   'summary' + coin.name,
  //   data && data.ticker.askRate
  // )

  const num = data && data.ticker.askRate * globalState.bitcoinRandPrice
  const randPrice = num && num.toFixed(2)

  return <span>{num ? `R${randPrice}` : 'n/d'}</span>
}

CoinTicker.propTypes = {
  coin: PropTypes.object.isRequired
}

export default CoinTicker
