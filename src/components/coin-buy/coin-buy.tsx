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
import { useForm } from 'react-hook-form';
import { usePaystackPayment } from 'react-paystack';
import { getPaystackConfig } from '../../common/utils';
import { ICoin } from '../coin-item/coin-item';
import NumberFormatCustom from './number-format-custom';
import useStyles from './use-styles';

interface Inputs {
  localCurrency: string;
  cryptoCurrency: string;
}

interface Props {
  coin: ICoin;
}

const CoinBuy = ({ coin }: Props) => {
  const classes = useStyles();
  const initializePayment = usePaystackPayment(getPaystackConfig());
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    // mode: 'onSubmit',
    // reValidateMode: 'onChange',
    // defaultValues: {},
    // resolver: undefined,
    // context: undefined,
    criteriaMode: 'all',
    shouldFocusError: true
  });

  const onSubmitHandler = (data: unknown) => {
    // e.preventDefault()
    console.debug(data);
    initializePayment(onSuccess, onClose);
  };

  // you can call this function anything
  const onSuccess = (reference: unknown) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.debug(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.debug('closed');
  };

  return (
    <Card className={classes.root}>
      <form
        noValidate
        autoComplete="off"
        method="POST"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Grid container>
          <Grid item xs={12} md={4} className={classes.grid}>
            <InputLabel htmlFor="gridLeftInput" className={classes.gridTitle}>
              You pay in <strong>Rands (ZAR)</strong>
            </InputLabel>
            <TextField
              {...register('localCurrency', { required: true, maxLength: 25 })}
              id="gridLeftInput"
              name="localCurrency"
              fullWidth
              helperText={errors.localCurrency && errors.localCurrency.message}
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
              {...register('cryptoCurrency', { required: true, maxLength: 25 })}
              id="gridRightInput"
              name="cryptoCurrency"
              fullWidth
              helperText={
                errors.cryptoCurrency && errors.cryptoCurrency.message
              }
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
