import { useLazyQuery } from '@apollo/client';
import { Alert, Box, Snackbar } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isServer } from '../../common/utils';
import RootStyled from '../../components/atoms/root';
import Loader from '../../components/molecules/loader';
import CardConfirmationOrder from '../../components/organisms/card-confirmation-order';
import CardEmailForm from '../../components/organisms/card-email-form';
import CardWithdrawalForm from '../../components/organisms/card-withdrawal-form';
import { GET_ORDER_IS_PENDING } from '../../graphql/queries';
import { Order as OrderType } from '../../graphql/types';

const Order: NextPage = () => {
  const router = useRouter();
  const { base64Id } = router.query;
  const [slug, setSlug] = useState<string[]>([]);

  useEffect(() => {
    if (!isServer() && !!base64Id) {
      setSlug(window.atob(String(base64Id)).split('/'));
    }
  }, [base64Id]);

  const symbol = slug[0];
  const orderNumber = slug[1];
  const cryptoCurrency = slug[2] ? Number(slug[2]) : 0;
  const totalAmount = slug[3] ? Number(slug[3]) : 0;
  const pinNumber = slug[4];

  const [waitingOrderConfirmation, setOrderConfirmation] = useState(false);
  const [order, setOrder] = useState<OrderType>();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [getOrderFunc, { error: errorAlert }] = useLazyQuery(
    GET_ORDER_IS_PENDING,
    {
      fetchPolicy: 'network-only',
      variables: { id: orderNumber }
    }
  );

  const onCloseErrorAlertHandler = () => {
    setShowErrorAlert(false);
  };

  useEffect(() => {
    const onIntervalOrderHandler = async () => {
      const {
        data: { getOrder }
      } = await getOrderFunc();

      setOrderConfirmation(getOrder.isPending !== true);
      setOrder(getOrder);
    };

    onIntervalOrderHandler();

    const intervalId = setInterval(onIntervalOrderHandler, 5000);

    return () => window.clearInterval(intervalId);
  }, [getOrderFunc]);

  useEffect(() => {
    if (errorAlert) {
      setShowErrorAlert(true);
    }
  }, [errorAlert]);

  return (
    <>
      <RootStyled>
        <h1 className="display-3">Order</h1>

        {slug ? (
          <CardConfirmationOrder
            cryptoCurrency={cryptoCurrency}
            totalAmount={totalAmount}
            orderNumber={orderNumber}
            symbol={symbol}
            pin={pinNumber}
            waitingOrderConfirmation={waitingOrderConfirmation}
            orderReferences={order?.orderReferences}
            hasErrors={order?.hasErrors}
          />
        ) : (
          <Loader />
        )}

        {waitingOrderConfirmation && !order?.hasErrors && (
          <Box sx={{ marginTop: '2.5rem' }}>
            <CardWithdrawalForm symbol={symbol} orderId={orderNumber} />
          </Box>
        )}

        <Box sx={{ marginTop: '2.5rem' }}>
          <CardEmailForm orderId={orderNumber} />
        </Box>
      </RootStyled>

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

export default Order;
