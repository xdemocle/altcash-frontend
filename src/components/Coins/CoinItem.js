import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Tooltip from '@material-ui/core/Tooltip'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import Divider from '@material-ui/core/Divider'
import CoinTicker from '../Common/CoinTicker'
import CoinSVG from './CoinSvg'
import useGlobal from '../../common/globalStateHook'

const useStyles = makeStyles((theme) => ({
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
}))

const CoinItem = ({ coin }) => {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()
  const showIconBuy = useMediaQuery('(min-width:600px)')

  if (!coin) {
    return null
  }

  const isCoinActive = coin.status === 'ONLINE'
  const isStarred = globalState.userCoinFavourites.includes(coin.symbol)

  return (
    <React.Fragment>
      <ListItem button component={Link} to={`/coin/${coin.id.toLowerCase()}`}>
        <ListItemIcon>
          <CoinSVG coinSymbol={coin.symbol} />
        </ListItemIcon>
        <ListItemText
          primary={coin.name}
          secondary={`${coin.symbol.toUpperCase()} ${
            !isCoinActive ? ' / ' + coin.status : ''
          }`}
          className={classes.column}
        />
        <ListItemText
          primary={<CoinTicker coin={coin} />}
          secondary="Live Price"
          className={classNames(classes.column, coin.status)}
        />
        <ListItemSecondaryAction>
          {showIconBuy && (
            <Tooltip title="Buy now" placement="bottom">
              <IconButton
                aria-label="Buy now"
                component={Link}
                to={`/coin/${coin.id.toLowerCase()}`}
              >
                <ShoppingBasket />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Add to your favourite" placement="bottom">
            <IconButton
              aria-label="Add to your favourite"
              onClick={() => {
                if (isStarred) {
                  globalActions.removeUserCoinFavourites(coin.symbol)
                } else {
                  globalActions.addUserCoinFavourites(coin.symbol)
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
  coin: PropTypes.object.isRequired
}

export default CoinItem
