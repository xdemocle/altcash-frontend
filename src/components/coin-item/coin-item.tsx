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
  id: string;
  name: string;
  status: string;
  symbol: string;
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
          className={clsx(classes.column, coin.status)}
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
          <Tooltip title="Add to your favourite" placement="bottom">
            <Button
              aria-label="Add to your favourite"
              onClick={iconButtonHandler}
            >
              {userCoinFavourites.includes(coin.symbol as never) ? (
                <Star />
              ) : (
                <StarBorder />
              )}
            </Button>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

export default CoinItem;
