import React, { Fragment, useEffect } from 'react'
import useGlobal from '../common/globalStateHook'

const BitcoinRandLivePrice: React.FC = () => {
  const [globalState, globalActions] = useGlobal()

  useEffect(() => {
    globalActions.updateBitcoinRandPrice()

    const intervalBtcPrice = setInterval(
      () => globalActions.updateBitcoinRandPrice(),
      60000
    )

    return () => {
      window.clearInterval(intervalBtcPrice)
    }
  }, [globalActions])

  console.debug('bitcoinRandPrice', globalState.bitcoinRandPrice)

  return <Fragment />
}

export default BitcoinRandLivePrice
