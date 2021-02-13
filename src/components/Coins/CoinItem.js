import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { ReactSVG } from 'react-svg'
import Tooltip from '@material-ui/core/Tooltip'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Divider from '@material-ui/core/Divider'
import CoinTicker from '../Common/CoinTicker'
import useGlobal from '../../common/globalStateHook'

const styles = (theme) => ({
  avatar: {
    width: '2rem',
    height: '2rem',
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
  column: {
    flexBasis: 0
  }
})

const svgCoinPathHelper = (name) => {
  return require(`cryptocurrency-icons/svg/color/${name}.svg`).default
}

const CoinItem = ({ classes, coin }) => {
  const [globalState, globalActions] = useGlobal()
  const isCoinActive = coin.status === 'ONLINE'
  let coinSymbol = coin.baseCurrencySymbol.toLowerCase()
  let svgCoinPath = null

  try {
    svgCoinPath = svgCoinPathHelper(coinSymbol)
  } catch (err) {
    coinSymbol = 'cc-default'
    svgCoinPath = svgCoinPathHelper('btc')
  }

  const isStarred = globalState.userCoinFavourites.includes(
    coin.baseCurrencySymbol
  )

  return (
    <React.Fragment>
      <ListItem button>
        <ListItemIcon>
          <ReactSVG
            src={svgCoinPath}
            className={classNames(classes.avatar, coinSymbol)}
          />
        </ListItemIcon>
        <ListItemText
          primary={coin.name}
          secondary={coin.baseCurrencySymbol.toUpperCase()}
          className={classes.column}
        />
        <ListItemText
          primary={<CoinTicker coin={isCoinActive} />}
          secondary="Live Price"
          className={classNames(classes.column, coin.status)}
        />
        <ListItemSecondaryAction>
          <Tooltip title="Add to your cart" placement="bottom">
            <IconButton aria-label="Add to your cart">
              <AddShoppingCartIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add to your favourite" placement="bottom">
            <IconButton
              aria-label="Add to your favourite"
              onClick={() => {
                if (isStarred) {
                  globalActions.removeUserCoinFavourites(
                    coin.baseCurrencySymbol
                  )
                } else {
                  globalActions.addUserCoinFavourites(coin.baseCurrencySymbol)
                }
              }}
            >
              {isStarred ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </React.Fragment>
  )
}

CoinItem.propTypes = {
  classes: PropTypes.object.isRequired,
  coin: PropTypes.object.isRequired
}

export default withStyles(styles)(CoinItem)
