import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import useGlobal from '../common/globalStateHook'
import CoinSVG from './CoinSvg'
import CoinTicker from './CoinTicker'

export interface Coin {
  id: string
  name: string
  status: string
  symbol: string
}

type Props = {
  coin: Coin
}

const CoinItem: React.FC<Props> = ({ coin }: Props) => {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()
  const showIconBuy = useMediaQuery('(min-width:600px)')

  if (!coin) {
    return null
  }

  const isCoinActive = coin.status === 'ONLINE'
  const isStarred = globalState.userCoinFavourites.includes(
    coin.symbol as never
  )

  return (
    <React.Fragment>
      <ListItem
        button
        component={Link}
        to={`/coin/${coin.id.toLowerCase()}`}
        className={classes.listItem}
      >
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

export default CoinItem

const useStyles = makeStyles((theme) => ({
  column: {
    flexBasis: 0
  },
  listItem: {
    'a&': {
      textDecoration: 'none',
      color: '#2B3A41'
    },
    'a:hover&': {
      backgroundColor: 'rgba(24, 161, 30, 0.1)'
    }
  }
}))
