import List from '@material-ui/core/List'
import React from 'react'
import CoinItem, { Coin } from './CoinItem'

type Props = {
  coins: Coin[]
}

const CoinsListMap: React.FC<Props> = ({ coins }: Props) => {
  return (
    <List>
      {coins.map((coin: Coin, ix: number) => {
        return coin && <CoinItem key={`${coin.name}${ix}`} coin={coin} />
      })}
    </List>
  )
}

export default React.memo(CoinsListMap)
