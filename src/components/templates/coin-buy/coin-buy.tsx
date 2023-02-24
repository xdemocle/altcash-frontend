/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client';
import { ArrowForward, ArrowDownward } from '@mui/icons-material';
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
import { useRouter } from 'next/router';
import {
  FC,
  FormEvent,
  SyntheticEvent,
  useMemo,
  useEffect,
  useState
} from 'react';
import { usePaystackPayment } from 'react-paystack';
import ReactPlaceholder from 'react-placeholder';
import {
  MIN_AMOUNT_EXTRA,
  MIN_AMOUNT_MULTIPLIER,
  PERCENTAGE_FEE, // PERCENTAGE_FEE_EXCHANGE,
  PERCENTAGE_FEE_PAYMENT
} from '../../../common/constants';
import { getPaystackConfig, isServer } from '../../../common/utils';
import { CREATE_ORDER, UPDATE_ORDER } from '../../../graphql/mutations';
import { Market, OrderParams, Ticker } from '../../../graphql/types';
import useGlobal from '../../../hooks/use-global';
import useMultiplier from '../../../hooks/use-multiplier';
import useRound from '../../../hooks/use-round';
import NumberFormatCustom from '../../atoms/number-format-custom';
import useStyles from './use-styles';

interface CoinBuyProps {
  coin: Market;
  ticker: Ticker;
}

const CoinBuy: FC<CoinBuyProps> = ({ coin, ticker }) => {
  const classes = useStyles();
  const router = useRouter();
  const { getRound } = useRound();
  const { bitcoinRandPrice } = useGlobal();
  const [notional, setNotional] = useState(0);
  const [bulbColor, setBulbColor] = useState('green');
  const [orderInfo, setOrderInfo] = useState('');
  const [triggerConfirmationOrder, setTriggerConfirmationOrder] =
    useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [localCurrency, setLocalCurrency] = useState(0);
  const [cryptoCurrency, setCryptoCurrencyValue] = useState(0);
  const { multiplier } = useMultiplier(ticker);
  const initializePayment = usePaystackPayment(getPaystackConfig(totalAmount));
  const [createOrder, { error: errorCreateOrder }] = useMutation(CREATE_ORDER);
  const [updateOrder, { error: errorUpdateOrder }] = useMutation(UPDATE_ORDER);

  if (errorCreateOrder || errorUpdateOrder) {
    console.debug('Mutations', errorCreateOrder, errorUpdateOrder);
  }

  const setCryptoCurrency = (value: number) => {
    const valueRounded = getRound(value, coin.stepSize);
    setCryptoCurrencyValue(Number(valueRounded.toFixed(coin.quotePrecision)));
  };

  const updateOrderHandler = async (input: OrderParams) => {
    const id = orderInfo.split('/')[0];

    // UPDATE new order to backend with payment reference
    const { data } = await updateOrder({
      variables: {
        id,
        input
      }
    });

    return data;
  };

  const updateOrderWithReference = async (reference: string) => {
    // UPDATE new order to backend with payment reference
    const data = await updateOrderHandler({
      isPaid: true,
      reference: JSON.stringify(reference)
    });

    console.debug('updateOrderWithReference', data);
  };

  const updateOrderCancelled = async () => {
    // UPDATE new order to backend to cancel it
    const data = await updateOrderHandler({
      isCancelled: true
    });

    console.debug('updateOrderCancelled', data);
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormDisabled(true);

    // POST new order to backend
    if (!orderInfo.length) {
      try {
        const { data } = await createOrder({
          variables: {
            amount: String(cryptoCurrency),
            total: String(totalAmount),
            symbol: coin.symbol
          }
        });

        setOrderInfo(
          data.createOrder._id +
            '/' +
            data.createOrder.amount +
            '/' +
            data.createOrder.total +
            '/' +
            data.createOrder.pin
        );
      } catch (error) {
        setOrderInfo('');
      }
    }

    setFormDisabled(false);
  };

  const onPaymentSuccess = (reference: string) => {
    console.debug('onPaymentSuccess', reference);
    // UPDATE update order to backend with provider payment reference
    updateOrderWithReference(reference);
    setTriggerConfirmationOrder(true);
  };

  const onPaymentClose = () => {
    console.debug('onPaymentClose');
    updateOrderCancelled();
    setOrderInfo('');
    setFormDisabled(false);
  };

  const gotoConfirmationOrder = () => {
    if (!isServer()) {
      const orderNumberRawArray = orderInfo.split('/');
      let slashedString = `${coin.symbol}/${orderNumberRawArray[0]}/${orderNumberRawArray[1]}/${orderNumberRawArray[2]}`;

      // For the pin
      if (orderNumberRawArray[3]) {
        slashedString = `${slashedString}/${orderNumberRawArray[3]}`;
      }

      router.push(`/orders/${window.btoa(slashedString)}`);
    }
  };

  const onFocusInputHandler = (e: SyntheticEvent | Event) => {
    (e?.target as HTMLInputElement).select();
  };

  const onBlurLocalCurrencyHandler = () => {
    if (localCurrency !== cryptoCurrency / multiplier) {
      setLocalCurrency(cryptoCurrency * multiplier);
    }
  };

  useEffect(() => {
    if (orderInfo.length > 0) {
      if (
        localCurrency >
        coin.minTradeSize * multiplier * MIN_AMOUNT_MULTIPLIER +
          MIN_AMOUNT_EXTRA
      ) {
        initializePayment(onPaymentSuccess, onPaymentClose);
      }
    }
  }, [orderInfo]);

  useEffect(() => {
    if (triggerConfirmationOrder) {
      gotoConfirmationOrder();
      setTriggerConfirmationOrder(false);
    }
  }, [triggerConfirmationOrder]);

  useEffect(() => {
    if (coin.status === 'TRADING') {
      setBulbColor('yellow');
      setTimeout(() => setBulbColor('green'), 3000);
    }
  }, [multiplier]);

  useEffect(() => {
    setCryptoCurrency(localCurrency / multiplier);

    setTotalAmount(
      localCurrency +
        (PERCENTAGE_FEE_PAYMENT / 100) * localCurrency +
        // Minimum Rand fee for payment provider fixed cost
        1 +
        (PERCENTAGE_FEE / 100) * localCurrency
    );
  }, [localCurrency, multiplier]);

  useEffect(() => {
    if (coin?.minNotional && bitcoinRandPrice) {
      setNotional(coin.minNotional * bitcoinRandPrice);
    }

    if (coin?.status !== 'TRADING') {
      setBulbColor('red');
    }
  }, [coin, bitcoinRandPrice]);

  const minTradeAmount = useMemo(
    () =>
      coin.minTradeSize * multiplier * MIN_AMOUNT_MULTIPLIER +
      MIN_AMOUNT_EXTRA +
      notional,
    [coin.minTradeSize, notional]
  );

  return (
    <form
      noValidate
      autoComplete="off"
      method="POST"
      onSubmit={onSubmitHandler}
    >
      <Card className={classes.root}>
        <div className={classes.grid}>
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
              helperText={
                <ReactPlaceholder type="textRow" ready={!!coin}>
                  Min: R {(minTradeAmount || 0).toFixed(2)}
                </ReactPlaceholder>
              }
              variant="outlined"
              inputProps={{
                maxLength: '25',
                min: Number((minTradeAmount || 0).toFixed(2)),
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              type="number"
              InputProps={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputComponent: NumberFormatCustom as any,
                startAdornment: (
                  <InputAdornment position="start">R</InputAdornment>
                )
              }}
              value={localCurrency.toFixed(2)}
              onChange={(e) => setLocalCurrency(Number(e.target.value))}
              onFocus={onFocusInputHandler}
              disabled={formDisabled}
              onBlur={onBlurLocalCurrencyHandler}
            />
          </Grid>

          <div className={classes.flex}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <ArrowForward color="primary" className={classes.arrow} />
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <ArrowDownward
                color="primary"
                className={clsx(classes.arrow, classes.arrowMobile)}
              />
            </Box>
          </div>

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
              helperText={
                <ReactPlaceholder type="textRow" ready={!!coin}>
                  Step: {coin.stepSize}
                </ReactPlaceholder>
              }
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {coin.symbol || ''}
                  </InputAdornment>
                )
              }}
              value={cryptoCurrency}
              onFocus={onFocusInputHandler}
              disabled
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
              disabled={
                localCurrency <= minTradeAmount ||
                formDisabled ||
                bulbColor === 'red'
              }
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
          localCurrency >
            coin.minTradeSize * multiplier * MIN_AMOUNT_MULTIPLIER +
              MIN_AMOUNT_EXTRA && classes.innerCardOpen
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
            value={(PERCENTAGE_FEE_PAYMENT / 100) * localCurrency + 1}
          />{' '}
          +<br />
          (altcash fee) R{' '}
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
