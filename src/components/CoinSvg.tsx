import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ReactSVG } from 'react-svg'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
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

const svgCoinPathHelper = (name) => {
  return require(`cryptocurrency-icons/svg/color/${name}.svg`).default
}

const CoinSVG = ({ coinSymbol, size }) => {
  const classes = useStyles()
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
        size ? classes[size] : classes.regular,
        symbol
      )}
    />
  )
}

CoinSVG.propTypes = {
  coinSymbol: PropTypes.string.isRequired,
  size: PropTypes.string
}

export default CoinSVG
