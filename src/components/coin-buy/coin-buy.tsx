import { SwapHoriz, SwapVert } from '@mui/icons-material';
import {
  Button,
  Card,
  Grid,
  Hidden,
  InputAdornment,
  InputLabel,
  TextField
} from '@mui/material';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
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
              <Hidden smDown>
                <SwapHoriz color="primary" className={classes.arrow} />
              </Hidden>
              <Hidden mdUp>
                <SwapVert
                  color="primary"
                  className={clsx(classes.arrow, classes.arrowMobile)}
                />
              </Hidden>
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

          <Grid item xs={12} md={3}>
            <div className={classes.buyButtonInner}>
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
