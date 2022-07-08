import { Box, Card, Tooltip, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Coin } from '../../graphql/types';
import Loader from '../loader';
import NumberFormatCustom from './number-format-custom';
import useStyles from './use-styles';

interface CardConfirmationOrderProps {
  symbol: Coin['symbol'];
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

  // Simulate order confrimation succeeded
  useEffect(() => {
    setTimeout(() => setOrderConfirmation(true), 8000);
  }, []);

  return (
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
              title="This PIN has also been sent via e-mail to you."
              open={showPinTooltip}
            >
              <a
                href="#"
                onClick={() => setShowPinTooltip(true)}
                onMouseOver={() => setShowPinTooltip(true)}
                onMouseOut={() => setShowPinTooltip(false)}
              >
                {!pin ? '****' : pin}
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
              <Loader text="Waiting for order confirmation..." centered />
            </Box>
          ) : (
            <Box className={classes.confirmationLoader}>Order confirmed</Box>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default CardConfirmationOrder;
