import { useQuery } from '@apollo/client'
import React from 'react'
import { btcToRandPrice } from '../common/currency'
import { GET_TICKER, GET_PAIR } from '../graphql/queries'
import { Coin } from './CoinItem'

type Props = {
  coin: Coin
}

const CoinTicker: React.FC<Props> = ({ coin }: Props) => {
  const { data } = useQuery(GET_TICKER, {
    fetchPolicy: 'cache-first',
    variables: {
      id: coin && coin.id
    }
  })

  const { data: dataPair } = useQuery(GET_PAIR, {
    fetchPolicy: 'cache-first',
    variables: {
      pair: 'XBTZAR'
    }
  })

  if (!coin) {
    return null
  }

  const dataTicker = data ? data.ticker : {}
  const bitcoinRandPrice = dataPair ? dataPair.pair.last_trade : undefined

  return (
    <span>
      {dataTicker.askRate && bitcoinRandPrice
        ? btcToRandPrice(dataTicker.askRate, bitcoinRandPrice)
        : 'n/d'}
    </span>
  )
}

export default CoinTicker
