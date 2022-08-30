import { ShoppingBasket, Star, StarBorder } from '@mui/icons-material';
import {
  Button,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { Fragment, SyntheticEvent } from 'react';
import { Market } from '../../../graphql/types';
import useFavourites from '../../../hooks/use-favourites';
import CoinSVG from '../../atoms/coin-svg';
import CoinTicker from '../coin-ticker';
import useStyles from './use-styles';

type Props = {
  coin: Market;
};

const CoinItem = ({ coin }: Props) => {
  const classes = useStyles();
  const showBuy = useMediaQuery('(min-width:600px)');
  const { addFavourites, removeFavourites, userCoinFavourites } =
    useFavourites();

  if (!coin) {
    return null;
  }

  const iconButtonHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    if (userCoinFavourites.includes(coin.symbol as never)) {
      removeFavourites(coin.symbol);
    } else {
      addFavourites(coin.symbol);
    }
  };

  const isStarred = userCoinFavourites.includes(coin.symbol as never);

  return (
    <Fragment>
      <Link href={`/coin/${coin.id.toLowerCase()}`}>
        <a style={{ textDecoration: 'none' }}>
          <ListItemButton className={classes.listItem}>
            <ListItemIcon>
              <CoinSVG coinSymbol={coin.symbol} />
            </ListItemIcon>
            <ListItemText
              primary={coin.name || coin.id}
              secondary={`${coin.symbol.toUpperCase()} ${
                coin.status !== 'TRADING' ? ' / ' + coin.status : ''
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
                  <Link href={`/coin/${coin.id.toLowerCase()}`}>
                    <Button aria-label="Buy now">
                      <ShoppingBasket />
                    </Button>
                  </Link>
                </Tooltip>
              )}
              <Tooltip
                title={`${
                  isStarred ? 'Remove from' : 'Add to'
                } your favourites`}
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
          </ListItemButton>
        </a>
      </Link>
      <Divider />
    </Fragment>
  );
};

export default CoinItem;
