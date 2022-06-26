import { ShoppingBasket, Star, StarBorder } from '@mui/icons-material';
import {
  Button,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import clsx from 'clsx';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useUserCoinFavourites } from '../../context/user-coin-favourites';
import CoinSVG from '../coin-svg';
import CoinTicker from '../coin-ticker';
import useStyles from './use-styles';

export interface ICoin {
  minTradeSize: number;
  id: string;
  name: string;
  status: string;
  symbol: string;
}

export interface ITicker {
  askRate: number;
  bidRate: number;
  id: string;
  lastTradeRate: number;
}

type Props = {
  coin: ICoin;
};

const CoinItem = ({ coin }: Props) => {
  const classes = useStyles();
  const showBuy = useMediaQuery('(min-width:600px)');
  const {
    addUserCoinFavourites,
    removeUserCoinFavourites,
    userCoinFavourites
  } = useUserCoinFavourites();

  if (!coin) {
    return null;
  }

  const iconButtonHandler = () => {
    if (userCoinFavourites.includes(coin.symbol as never)) {
      removeUserCoinFavourites(coin.symbol);
    } else {
      addUserCoinFavourites(coin.symbol);
    }
  };

  const isStarred = userCoinFavourites.includes(coin.symbol as never);

  return (
    <Fragment>
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
            coin.status !== 'ONLINE' ? ' / ' + coin.status : ''
          }`}
          className={classes.column}
        />
        <ListItemText
          primary={<CoinTicker coin={coin} />}
          secondary="Live Price"
          className={clsx(classes.column, classes.ticker, coin.status)}
        />
        <ListItemSecondaryAction>
          {showBuy && (
            <Tooltip title="Buy now" placement="bottom">
              <Button
                aria-label="Buy now"
                component={Link}
                to={`/coin/${coin.id.toLowerCase()}`}
              >
                <ShoppingBasket />
              </Button>
            </Tooltip>
          )}
          <Tooltip
            title={`${isStarred ? 'Remove from' : 'Add to'} your favourites`}
            placement="bottom"
          >
            <Button
              aria-label={`${
                isStarred ? 'Remove from' : 'Add to'
              } your favourites`}
              onClick={iconButtonHandler}
            >
              {isStarred ? <Star /> : <StarBorder />}
            </Button>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

export default CoinItem;
