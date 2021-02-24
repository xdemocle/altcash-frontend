import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { find } from 'lodash'
import React from 'react'
import { ReactSVG } from 'react-svg'
import { GET_META_COIN_LOGO } from '../graphql/queries'

type Props = {
  coinSymbol: string
  size?: string
}

const CoinSVG: React.FC<Props> = ({ coinSymbol, size }: Props) => {
  const classes: Record<string, string> = useStyles()
  let symbol = coinSymbol.toLowerCase()
  let imgCoinPath = ''
  let svgCoinPath = null

  const { data: metadata } = useQuery(GET_META_COIN_LOGO, {
    // We refresh data list at least at reload
    fetchPolicy: 'cache-only'
  })

  const getCoinLogo = (symbol: string) => {
    if (!metadata || !metadata.metaCoinAll) {
      return 'n/d'
    }

    const coin = find(metadata.metaCoinAll, { symbol })

    if (!coin || !coin.logo) {
      return svgCoinPathHelper('btc')
    }
    return coin.logo
  }

  try {
    svgCoinPath = svgCoinPathHelper(symbol)
  } catch (err) {
    symbol = 'cc-default'
    // coinSymbol.toUpperCase()
    // svgCoinPath = svgCoinPathHelper('btc')
    // imgCoinPath = 'https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png'
    imgCoinPath = getCoinLogo(coinSymbol.toUpperCase())
  }

  return !!svgCoinPath ? (
    <ReactSVG
      src={svgCoinPath}
      className={classNames(
        classes.avatar,
        symbol,
        size ? classes[size] : classes.regular
      )}
    />
  ) : (
    <img
      src={imgCoinPath}
      alt={imgCoinPath}
      width="32"
      height="32"
      title={`Logo ${coinSymbol}`}
    />
  )
}

const svgCoinPathHelper = (name: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(`cryptocurrency-icons/svg/color/${name}.svg`).default
}

const useStyles = makeStyles(() => ({
  avatar: {
    padding: 0,
    verticalAlign: 'middle',
    overflow: 'visible',
    '& svg': {
      width: '2rem',
      height: '2rem',
      padding: 0,
      verticalAlign: 'middle',
      overflow: 'visible'
    }
  },
  regular: {
    width: '2rem',
    height: '2rem',
    '& svg': {
      width: '2rem',
      height: '2rem'
    }
  },
  large: {
    width: '4rem',
    height: '4rem',
    '& svg': {
      width: '4rem',
      height: '4rem'
    }
  }
}))

export default CoinSVG
