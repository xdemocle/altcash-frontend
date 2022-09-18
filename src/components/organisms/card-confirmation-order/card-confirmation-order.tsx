import { Alert, Box, Card, Snackbar, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import { FC, useState } from 'react';
import { Market } from '../../../graphql/types';
import NumberFormatCustom from '../../atoms/number-format-custom';
import Loader from '../../molecules/loader';
import useStyles from './use-styles';

interface CardConfirmationOrderProps {
  symbol: Market['symbol'];
  cryptoCurrency: number;
  totalAmount: number;
  orderNumber: string;
  pin?: string;
  waitingOrderConfirmation?: boolean;
  orderReferences?: string[];
  hasErrors?: boolean;
}

const CardConfirmationOrder: FC<CardConfirmationOrderProps> = ({
  symbol,
  cryptoCurrency,
  totalAmount,
  orderNumber,
  pin,
  waitingOrderConfirmation,
  orderReferences,
  hasErrors
}) => {
  const classes = useStyles();
  const [showPinTooltip, setShowPinTooltip] = useState(false);
  const [showPinAlert, setShowPinAlert] = useState(false);

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

  const transformReference = (originalReference: string) => {
    const reference = JSON.parse(originalReference);

    if (!reference.status) {
      return JSON.stringify(reference);
    }

    return JSON.stringify({
      status: reference.status,
      executedQty: reference.executedQty,
      origQty: reference.origQty
    });
  };

  return (
    <>
      <Box className={classes.confirmationGrid}>
        <Box className={classes.confirmationGridCol}>
          <Card className={classes.confirmationGridCard}>
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
          </Card>
        </Box>

        <Box className={classes.confirmationGridCol}>
          <Card className={classes.confirmationGridCard}>
            {!waitingOrderConfirmation && !hasErrors ? (
              <Box className={classes.confirmationLoader}>
                <Loader text="Waiting for the exchange order..." centered />
              </Box>
            ) : hasErrors ? (
              <Box className={`${classes.confirmationLoader} float-animation`}>
                <Image
                  src="/assets/error-illustration.png"
                  width="128"
                  height="128"
                  alt="error-illustration.png"
                />
                <div className={classes.confirmationLoaderText}>
                  Order with problems.
                  <br />
                  Please, contact Support.
                </div>
              </Box>
            ) : (
              <Box className={`${classes.confirmationLoader} float-animation`}>
                <Image
                  src="/assets/transparent-yellow-dollar-coins-illustration.png"
                  width="200"
                  height="130"
                  alt="transparent-yellow-dollar-coins-illustration.png"
                />
                <div className={classes.confirmationLoaderText}>
                  Order confirmed and coins allocated.
                </div>
              </Box>
            )}

            <hr className={classes.confirmationSeparator} />

            <Box>
              <Box className={classes.logs}>
                Order logs:
                {orderReferences?.map((reference, ix) => (
                  <div
                    key={ix}
                    className={classes.orderReference}
                    title={transformReference(reference)}
                  >
                    {transformReference(reference)}
                  </div>
                ))}
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>

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
    </>
  );
};

export default CardConfirmationOrder;
