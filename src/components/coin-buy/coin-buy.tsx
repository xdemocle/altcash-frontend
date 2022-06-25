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
  const [localCurrency, setLocalCurrency] = useState(0);
  const [cryptoCurrency, setCryptoCurrency] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const initializePayment = usePaystackPayment(
    getPaystackConfig(localCurrency)
  );

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    initializePayment(onSuccess, onClose);
  };

  // you can call this function anything
  const onSuccess = (reference: unknown) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.debug(reference);
  };

  // you can call this function anything
  const onClose = (e: unknown) => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.debug('closed', e);
  };

  useEffect(() => {
    setCryptoCurrency(localCurrency / multiplier);
  }, [localCurrency, multiplier]);

  // useEffect(() => {
  //   if (localCurrency !== cryptoCurrency / multiplier) {
  //     setLocalCurrency(cryptoCurrency / multiplier);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [cryptoCurrency, multiplier]);

  useEffect(() => {
    const newMultiplier = Number(
      btcToRandPrice(ticker.lastTradeRate, bitcoinRandPrice)
    );

    if (!isNaN(newMultiplier)) {
      setMultiplier(newMultiplier);
    }
  }, [ticker, bitcoinRandPrice]);

  // console.debug('coin', coin);
  // console.debug('ticker', ticker);

  return (
    <Card className={classes.root}>
      <form
        noValidate
        autoComplete="off"
        method="POST"
        onSubmit={onSubmitHandler}
      >
        <Grid container>
          <Grid item xs={12} md={4} className={classes.grid}>
            <InputLabel htmlFor="gridLeftInput" className={classes.gridTitle}>
              You pay in <strong>Rands (ZAR)</strong>
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
            />
          </Grid>

          <Grid item xs={12} md={1} className={classes.grid}>
            <div className={classes.flex}>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <SwapHoriz color="primary" className={classes.arrow} />
              </Box>
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <SwapVert
                  color="primary"
                  className={clsx(classes.arrow, classes.arrowMobile)}
                />
              </Box>
            </div>
          </Grid>

          <Grid item xs={12} md={4} className={classes.grid}>
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
              // onChange={(e) => setCryptoCurrency(Number(e.target.value))}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'end' }}>
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
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default CoinBuy;
