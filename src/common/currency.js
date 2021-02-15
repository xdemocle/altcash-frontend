export const btcToRandPrice = (amounBTC, bitcoinRandPrice) => {
  let num = 0

  try {
    num = amounBTC * bitcoinRandPrice
  } catch (error) {
    return 'n/d'
  }

  return (
    num &&
    num
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      .replace(/^/, 'R ')
  )
}
