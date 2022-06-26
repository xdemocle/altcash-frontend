/* eslint-disable react-hooks/exhaustive-deps */
import { SwapHoriz, SwapVert } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  InputLabel,
  TextField
} from '@mui/material';
import clsx from 'clsx';
import { isNaN } from 'lodash';
import { FormEvent, useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
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
  const [localCurrency, setLocalCurrency] = useState(0);
  const [cryptoCurrency, setCryptoCurrency] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const initializePayment = usePaystackPayment(
    getPaystackConfig(localCurrency)
  );

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    initializePayment(onPaymentSuccess, onPaymentClose);
  };

  const onPaymentSuccess = (reference: unknown) => {
    console.debug(reference);
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
              // helperText={errors.localCurrency && errors.localCurrency.message}
              variant="outlined"
              inputProps={{
                maxLength: '25'
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
              // helperText={
              //   errors.cryptoCurrency && errors.cryptoCurrency.message
              // }
              variant="outlined"
              inputProps={{
                maxLength: '25'
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
            >
              Buy Now
            </Button>
          </div>
        </Box>
        <Box className={classes.boxBuyLed}>
          <div className={`led-${bulbColor}`}></div>
        </Box>
      </Card>
    </form>
  );
};

export default CoinBuy;
