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
import { useGlobal } from '../../context/global';
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
  const {
    addUserCoinFavourites,
    removeUserCoinFavourites,
    userCoinFavourites
  } = useGlobal();
  const showBuy = useMediaQuery('(min-width:600px)');

  if (!coin) {
    return null;
  }

  const isCoinActive = coin.status === 'ONLINE';
  const isStarred = userCoinFavourites.includes(coin.symbol as never);

  const iconButtonHandler = () => {
    if (isStarred) {
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
            !isCoinActive ? ' / ' + coin.status : ''
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
