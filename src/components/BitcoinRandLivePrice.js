import React, { Fragment, useEffect } from 'react'
import useGlobal from '../common/globalStateHook'

const BitcoinRandLivePrice = () => {
  // eslint-disable-next-line no-unused-vars
  const [globalState, globalActions] = useGlobal()

  useEffect(() => {
    globalActions.updateBitcoinRandPrice()

    const intervalBtcPrice = setInterval(
      () => globalActions.updateBitcoinRandPrice(),
      30000
    )

    return () => {
      window.clearInterval(intervalBtcPrice)
    }
  }, [globalActions])

  // console.log('bitcoinRandPrice', globalState.bitcoinRandPrice)

  return <Fragment />
}

export default BitcoinRandLivePrice
