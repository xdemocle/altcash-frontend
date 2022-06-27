/* eslint-disable react-hooks/exhaustive-deps */
import { SwapHoriz, SwapVert } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography
} from '@mui/material';
import clsx from 'clsx';
import { isNaN } from 'lodash';
import { FormEvent, useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { PERCENTAGE_FEE, PERCENTAGE_FEE_PAYMENT } from '../../common/constants';
import { btcToRandPrice } from '../../common/currency';
import { getPaystackConfig } from '../../common/utils';
import { useGlobal } from '../../context/global';
import { ICoin, ITicker } from '../coin-item/coin-item';
import NumberFormatCustom from './number-format-custom';
import useStyles from './use-styles';

// interface Inputs {
//   localCurrency: string;
//   cryptoCurrency: string;
// }

interface Props {
  coin: ICoin;
  ticker: ITicker;
}

const CoinBuy = ({ coin, ticker }: Props) => {
  const classes = useStyles();
  const { bitcoinRandPrice } = useGlobal();
  const [bulbColor, setBulbColor] = useState('green');
  const [gridReverse, setGridReverse] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [localCurrency, setLocalCurrency] = useState(0);
  const [cryptoCurrency, setCryptoCurrency] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const initializePayment = usePaystackPayment(getPaystackConfig(totalAmount));

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cryptoCurrency > coin.minTradeSize) {
      initializePayment(onPaymentSuccess, onPaymentClose);
    }
  };

  const onPaymentSuccess = (reference: unknown) => {
    console.debug(reference);
    // new order to backend with reference
  };

  const onPaymentClose = (e: unknown) => {
    console.debug('closed', e);
  };

  const onClickReverse = (e: unknown) => {
    setGridReverse(!gridReverse);
  };

  useEffect(() => {
    setBulbColor('yellow');
    setTimeout(() => setBulbColor('green'), 3000);
  }, [multiplier]);

  useEffect(() => {
    if (!gridReverse) setCryptoCurrency(localCurrency / multiplier);

    setTotalAmount(
      localCurrency +
        (PERCENTAGE_FEE_PAYMENT / 100) * localCurrency +
        (PERCENTAGE_FEE / 100) * localCurrency
    );
  }, [gridReverse, localCurrency, multiplier]);

  useEffect(() => {
    if (gridReverse && localCurrency !== cryptoCurrency / multiplier) {
      setLocalCurrency(cryptoCurrency * multiplier);
    }
  }, [gridReverse, cryptoCurrency, multiplier]);

  useEffect(() => {
    const newMultiplier = Number(
      btcToRandPrice(ticker.lastTradeRate, bitcoinRandPrice)
    );

    if (!isNaN(newMultiplier)) {
      setMultiplier(newMultiplier);
    }
  }, [ticker, bitcoinRandPrice]);

  return (
    <form
      noValidate
      autoComplete="off"
      method="POST"
      onSubmit={onSubmitHandler}
    >
      <Card className={classes.root}>
        <div
          className={clsx(classes.grid, gridReverse ? classes.gridReverse : '')}
        >
          <Grid
            item
            xs={12}
            md={4}
            className={classes.gridItem}
            sx={{ minWidth: '45%' }}
          >
            <InputLabel htmlFor="gridLeftInput" className={classes.gridTitle}>
              You pay in <strong>Rand (ZAR)</strong>
            </InputLabel>
            <TextField
              id="gridLeftInput"
              name="localCurrency"
              fullWidth
              helperText={`Min: R ${(coin && coin.minTradeSize
                ? coin.minTradeSize * multiplier
                : 0
              ).toFixed(2)}`}
              variant="outlined"
              inputProps={{
                maxLength: '25',
                min: coin.minTradeSize * multiplier
              }}
              InputProps={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputComponent: NumberFormatCustom as any,
                startAdornment: (
                  <InputAdornment position="start">R</InputAdornment>
                )
              }}
              value={localCurrency}
              onChange={(e) => setLocalCurrency(Number(e.target.value))}
              disabled={gridReverse}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={1}
            className={classes.gridItem}
            sx={{ minWidth: '10%' }}
          >
            <div className={classes.flex}>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <SwapHoriz
                  color="primary"
                  className={classes.arrow}
                  onClick={onClickReverse}
                />
              </Box>
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <SwapVert
                  color="primary"
                  className={clsx(classes.arrow, classes.arrowMobile)}
                  onClick={onClickReverse}
                />
              </Box>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            className={classes.gridItem}
            sx={{ minWidth: '45%' }}
          >
            <InputLabel htmlFor="gridRightInput" className={classes.gridTitle}>
              You get <strong className={classes.symbol}>{coin.name}</strong>
            </InputLabel>
            <TextField
              id="gridRightInput"
              name="cryptoCurrency"
              fullWidth
              helperText={`Min: ${(coin && coin.minTradeSize
                ? coin.minTradeSize
                : 0
              ).toFixed(2)} ${coin.symbol}`}
              variant="outlined"
              inputProps={{
                maxLength: '25',
                min: coin.minTradeSize
                // max: 10,
              }}
              InputProps={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputComponent: NumberFormatCustom as any,
                endAdornment: (
                  <InputAdornment position="start">
                    {coin.symbol || ''}
                  </InputAdornment>
                )
              }}
              value={cryptoCurrency}
              onChange={(e) => setCryptoCurrency(Number(e.target.value))}
              disabled={!gridReverse}
              type="number"
            />
          </Grid>
        </div>

        <Box className={classes.boxBuyButtonRoot}>
          <div className={classes.buyButtonContainer}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.buyButton}
              disabled={cryptoCurrency <= coin.minTradeSize}
            >
              Buy Now
            </Button>
          </div>
        </Box>
        <Box className={classes.boxBuyLed}>
          <div className={`led-${bulbColor}`}></div>
        </Box>
      </Card>

      <Card
        className={clsx(
          classes.innerCard,
          localCurrency > coin.minTradeSize * multiplier &&
            classes.innerCardOpen
        )}
      >
        <div className={classes.innerCardRoot}>
          <Typography
            variant="h6"
            sx={{
              borderBottom: '0.1rem solid',
              marginTop: '0.2rem',
              paddingTop: '0.2rem',
              marginBottom: '0.5rem',
              // textDecoration: 'underline',
              textTransform: 'uppercase'
            }}
            color="primary"
          >
            (Total buy) R {totalAmount.toFixed(2)} =
          </Typography>
          (amount selected) R {localCurrency} +<br />
          (payment fee) R{' '}
          {((PERCENTAGE_FEE_PAYMENT / 100) * localCurrency).toFixed(2)} +<br />
          (altcash fee) R {((PERCENTAGE_FEE / 100) * localCurrency).toFixed(
            2
          )}{' '}
          +
          <br />
        </div>
      </Card>
    </form>
  );
};

export default CoinBuy;
