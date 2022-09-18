import { useMutation } from '@apollo/client';
import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  Snackbar,
  TextField
} from '@mui/material';
import { FC, FormEvent, useState } from 'react';
import { UPDATE_ORDER } from '../../../graphql/mutations';
import { OrderParams } from '../../../graphql/types';
import useStyles from './use-styles';

interface CardWithdrawalFormProps {
  orderId: string;
  symbol: string;
}

const CardWithdrawalForm: FC<CardWithdrawalFormProps> = ({
  orderId,
  symbol
}) => {
  const classes = useStyles();
  const [formDisabled, setFormDisabled] = useState(false);
  const [addressValue, setAddressValue] = useState('');
  const [showAddressSent, setShowAddressSent] = useState(false);
  const [updateOrder, { error: errorUpdateOrder }] = useMutation(UPDATE_ORDER);

  const updateOrderHandler = async (input: OrderParams) => {
    // UPDATE new order to backend with wallet
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

    updateOrderHandler({ wallet: addressValue });

    setFormDisabled(true);
  };

  const onCloseAlertHandler = () => {
    setShowAddressSent(false);
    setFormDisabled(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <Box className={classes.confirmationGrid}>
          <Box sx={{ width: '100%' }}>
            <h2 className={classes.confirmationTitle}>
              Withdraw to your {symbol} Wallet
            </h2>

            <form noValidate method="POST" onSubmit={onSubmitHandler}>
              <Grid container gap={2}>
                <Grid item xs={12} md={8}>
                  <TextField
                    id="walletAddress"
                    name="walletAddress"
                    type="text"
                    placeholder={`Insert your ${symbol} wallet's address`}
                    fullWidth
                    variant="outlined"
                    value={addressValue}
                    onChange={(e) => setAddressValue(e.target.value)}
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
                    Widthdraw
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Card>

      <Snackbar
        open={showAddressSent}
        autoHideDuration={6000}
        onClose={onCloseAlertHandler}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Address sent correctly
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorUpdateOrder}
        autoHideDuration={6000}
        onClose={onCloseAlertHandler}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Withdrawal problems, try again...
        </Alert>
      </Snackbar>
    </>
  );
};

export default CardWithdrawalForm;
