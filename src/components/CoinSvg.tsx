import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import React from 'react'
import { ReactSVG } from 'react-svg'

type Props = {
  coinSymbol: string
  size?: string
}

const CoinSVG = ({ coinSymbol, size }: Props) => {
  const classes: Record<string, any> = useStyles()
  let symbol = coinSymbol.toLowerCase()
  let svgCoinPath = null

  try {
    svgCoinPath = svgCoinPathHelper(symbol)
  } catch (err) {
    symbol = 'cc-default'
    svgCoinPath = svgCoinPathHelper('btc')
  }

  return (
    <ReactSVG
      src={svgCoinPath}
      className={classNames(
        classes.avatar,
        symbol,
        size ? classes[size] : classes.regular
      )}
    />
  )
}

const svgCoinPathHelper = (name: string) => {
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
