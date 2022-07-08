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
import cryptoRandomString from 'crypto-random-string';
import { useRouter } from 'next/router';
import { FC, FormEvent, useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import {
  MIN_AMOUNT_EXTRA,
  ORDER_NUMBER_PREFIX,
  PERCENTAGE_FEE,
  PERCENTAGE_FEE_PAYMENT
} from '../../common/constants';
import { getPaystackConfig, isServer } from '../../common/utils';
import { Coin, Ticker } from '../../graphql/types';
import useMultiplier from '../../hooks/use-multiplier';
import NumberFormatCustom from './number-format-custom';
import useStyles from './use-styles';

interface CoinBuyProps {
  coin: Coin;
  ticker: Ticker;
}

const CoinBuy: FC<CoinBuyProps> = ({ coin, ticker }) => {
  const classes = useStyles();
  const router = useRouter();
  const [bulbColor, setBulbColor] = useState('green');
  const [orderInfo, setOrderInfo] = useState('');
  const [triggerConfirmationOrder, setTriggerConfirmationOrder] =
    useState(false);
  const [gridReverse, setGridReverse] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [localCurrency, setLocalCurrency] = useState(0);
  const [cryptoCurrency, setCryptoCurrency] = useState(0);
  const { multiplier } = useMultiplier(ticker);
  const initializePayment = usePaystackPayment(getPaystackConfig(totalAmount));

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormDisabled(true);

    const pin = cryptoRandomString({ length: 4, characters: '1234567890' });
    const orderNumber = cryptoRandomString({ length: 10, type: 'numeric' });

    // POST new order to backend
    setOrderInfo(ORDER_NUMBER_PREFIX + orderNumber + '/' + pin);

    // store all in localStorage to repopulate the transaction
    if (localCurrency > coin.minTradeSize * multiplier + MIN_AMOUNT_EXTRA) {
      initializePayment(onPaymentSuccess, onPaymentClose);
    }
  };

  const onPaymentSuccess = (reference: unknown) => {
    console.debug('onPaymentSuccess', reference);
    // UPDATE update order to backend with provider payment reference
    setTriggerConfirmationOrder(true);
    setFormDisabled(false);
  };

  useEffect(() => {
    if (triggerConfirmationOrder) {
      gotoConfirmationOrder();
      setTriggerConfirmationOrder(false);
    }
  }, [triggerConfirmationOrder]);

  const onPaymentClose = () => {
    console.debug('onPaymentClose');
    setFormDisabled(false);
  };

  const gotoConfirmationOrder = () => {
    if (!isServer()) {
      const orderNumberRawArray = orderInfo.split('/');
      let slashedString = `${coin.symbol}/${orderNumberRawArray[0]}/${cryptoCurrency}/${totalAmount}`;

      if (orderNumberRawArray[1]) {
        slashedString = `${slashedString}/${orderNumberRawArray[1]}`;
      }

      router.push(`/order/${window.btoa(slashedString)}`);
    }
  };

  const onClickReverse = () => {
    setGridReverse(!gridReverse);
  };

  useEffect(() => {
    setBulbColor('yellow');
    setTimeout(() => setBulbColor('green'), 3000);
  }, [multiplier]);

  useEffect(() => {
    if (!gridReverse) {
      setCryptoCurrency(localCurrency / multiplier);
    }

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
                ? coin.minTradeSize * multiplier + MIN_AMOUNT_EXTRA
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
              disabled={gridReverse || formDisabled}
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
              disabled={!gridReverse || formDisabled}
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
              disabled={cryptoCurrency <= coin.minTradeSize || formDisabled}
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
          localCurrency > coin.minTradeSize * multiplier + MIN_AMOUNT_EXTRA &&
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
              paddingBottom: '0.2rem',
              marginBottom: '0.5rem',
              textTransform: 'uppercase'
            }}
            color="primary"
          >
            (Total buy) R {totalAmount.toFixed(2)} =
          </Typography>
          (amount selected) R{' '}
          <NumberFormatCustom
            displayType="text"
            name="localCurrency"
            onChange={() => null}
            decimalScale={2}
            value={Number(localCurrency)}
          />{' '}
          +<br />
          (payment fee) R{' '}
          <NumberFormatCustom
            displayType="text"
            name="percentageFeePayment"
            onChange={() => null}
            decimalScale={2}
            value={(PERCENTAGE_FEE_PAYMENT / 100) * localCurrency}
          />{' '}
          +<br />
          (altcash fee) R
          <NumberFormatCustom
            displayType="text"
            name="percentageFeeAltcash"
            onChange={() => null}
            decimalScale={2}
            value={(PERCENTAGE_FEE / 100) * localCurrency}
          />{' '}
          +
          <br />
        </div>
      </Card>
    </form>
  );
};

export default CoinBuy;
