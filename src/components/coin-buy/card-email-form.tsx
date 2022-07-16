import { useLazyQuery, useMutation } from '@apollo/client';
import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  Snackbar,
  TextField
} from '@mui/material';
import { FC, FormEvent, useEffect, useState } from 'react';
import { UPDATE_ORDER } from '../../graphql/mutations';
import { OrderParams } from '../../graphql/types';
import useStyles from './use-styles';

interface CardEmailFormProps {
  orderId: string;
}

const CardEmailForm: FC<CardEmailFormProps> = ({ orderId }) => {
  const classes = useStyles();
  const [formDisabled, setFormDisabled] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [showEmailSent, setShowEmailSent] = useState(false);
  const [updateOrder, { error: errorUpdateOrder }] = useMutation(UPDATE_ORDER);

  console.debug(errorUpdateOrder);

  const updateOrderHandler = async (input: OrderParams) => {
    // UPDATE new order to backend with payment reference
    const { data } = await updateOrder({
      variables: {
        id: orderId,
        input
      }
    });

    return data;
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateOrderHandler({ email: emailValue });

    setFormDisabled(true);
  };

  const onCloseAlertHandler = () => {
    setShowEmailSent(false);
    setFormDisabled(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <Box className={classes.confirmationGrid}>
          <Box sx={{ width: '100%' }}>
            <h2 className={classes.confirmationTitle}>Send order to E-Mail</h2>

            <form noValidate method="POST" onSubmit={onSubmitHandler}>
              <Grid container gap={2}>
                <Grid item xs={12} md={8}>
                  {/* <InputLabel htmlFor="email" className={classes.gridTitle}>
                  Your e-mail
                </InputLabel> */}
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Insert your e-mail"
                    fullWidth
                    variant="outlined"
                    inputProps={{
                      maxLength: '25'
                    }}
                    // InputProps={{
                    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    //   inputComponent: NumberFormatCustom as any,
                    //   startAdornment: (
                    //     <InputAdornment position="start">R</InputAdornment>
                    //   )
                    // }}
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={3.765}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.buyButton}
                    disabled={formDisabled}
                  >
                    Send order copy
                  </Button>
                </Grid>
              </Grid>
            </form>

            {/* <hr className={classes.confirmationSeparator} /> */}
          </Box>
        </Box>
      </Card>

      <Snackbar
        open={showEmailSent}
        autoHideDuration={6000}
        onClose={onCloseAlertHandler}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Email sent correctly
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorUpdateOrder}
        autoHideDuration={6000}
        onClose={onCloseAlertHandler}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Email sent correctly
        </Alert>
      </Snackbar>
    </>
  );
};

export default CardEmailForm;
