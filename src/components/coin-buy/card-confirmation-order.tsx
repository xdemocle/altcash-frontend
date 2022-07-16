/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery } from '@apollo/client';
import { Alert, Box, Card, Snackbar, Tooltip, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { GET_ORDER_IS_PENDING } from '../../graphql/queries';
import { Market } from '../../graphql/types';
import Loader from '../loader';
import NumberFormatCustom from './number-format-custom';
import useStyles from './use-styles';

interface CardConfirmationOrderProps {
  symbol: Market['symbol'];
  cryptoCurrency: number;
  totalAmount: number;
  orderNumber: string;
  pin?: string;
}

const CardConfirmationOrder: FC<CardConfirmationOrderProps> = ({
  symbol,
  cryptoCurrency,
  totalAmount,
  orderNumber,
  pin
}) => {
  const classes = useStyles();
  const [waitingOrderConfirmation, setOrderConfirmation] = useState(false);
  const [showPinTooltip, setShowPinTooltip] = useState(false);
  const [showPinAlert, setShowPinAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [getOrderFunc, { error: errorAlert }] = useLazyQuery(
    GET_ORDER_IS_PENDING,
    {
      fetchPolicy: 'network-only',
      variables: { id: orderNumber }
    }
  );

  const onClickPinHandler = () => {
    setShowPinTooltip(true);
    setShowPinAlert(true);
  };

  const onClosePinHandler = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowPinAlert(false);
  };

  const onCloseErrorAlertHandler = () => {
    setShowErrorAlert(false);
  };

  // Simulate order confirmation succeeded
  useEffect(() => {
    const onIntervalOrderHandler = async () => {
      const {
        data: { getOrder }
      } = await getOrderFunc();
      if (getOrder.isPending !== true) {
        setOrderConfirmation(true);
      }
    };

    const intervalId = setInterval(onIntervalOrderHandler, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (errorAlert) {
      setShowErrorAlert(true);
    }
  }, [errorAlert]);

  return (
    <>
      <Card className={classes.root}>
        <Box className={classes.confirmationGrid}>
          <Box>
            <h2 className={classes.confirmationTitle}>Payment received</h2>

            {pin && (
              <h4 className={classes.confirmationTitleRed}>
                Take note of data below
              </h4>
            )}

            <Typography>Your order number: {orderNumber}</Typography>
            <Typography>
              Your PIN:{' '}
              <Tooltip
                placement="top"
                arrow
                title="This PIN can also be sent via e-mail to you below."
                open={showPinTooltip}
              >
                <a
                  href="#"
                  onClick={onClickPinHandler}
                  onMouseOver={() => setShowPinTooltip(true)}
                  onMouseOut={() => setShowPinTooltip(false)}
                >
                  ****
                </a>
              </Tooltip>
            </Typography>

            <hr className={classes.confirmationSeparator} />

            <Typography>
              You bought:{' '}
              <NumberFormatCustom
                displayType="text"
                name="cryptoCurrency"
                onChange={() => null}
                decimalScale={6}
                value={cryptoCurrency}
              />{' '}
              {symbol}
            </Typography>

            <Typography>
              You spent:{' '}
              <NumberFormatCustom
                displayType="text"
                name="totalAmount"
                onChange={() => null}
                value={Number(totalAmount)}
                decimalScale={2}
              />{' '}
              ZAR
            </Typography>
          </Box>

          <Box>
            {!waitingOrderConfirmation ? (
              <Box className={classes.confirmationLoader}>
                <Loader text="Waiting for the exchange order..." centered />
              </Box>
            ) : (
              <Box className={classes.confirmationLoader}>Order confirmed</Box>
            )}
          </Box>
        </Box>
      </Card>
      <Snackbar
        open={showPinAlert}
        autoHideDuration={6000}
        onClose={onClosePinHandler}
      >
        <Alert
          onClose={onClosePinHandler}
          severity="info"
          sx={{ width: '100%' }}
        >
          Your PIN is: {pin}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showErrorAlert}
        autoHideDuration={6000}
        onClose={onCloseErrorAlertHandler}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Error from the server or you are offline!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CardConfirmationOrder;
