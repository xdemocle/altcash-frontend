import { Box } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isServer } from '../../common/utils';
import RootStyled from '../../components/atoms/root';
import Loader from '../../components/molecules/loader';
import CardConfirmationOrder from '../../components/organisms/card-confirmation-order';
import CardEmailForm from '../../components/organisms/card-email-form';

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

  return (
    <RootStyled>
      <h1 className="display-3">Order</h1>
      {slug ? (
        <CardConfirmationOrder
          cryptoCurrency={cryptoCurrency}
          totalAmount={totalAmount}
          orderNumber={orderNumber}
          symbol={symbol}
          pin={pinNumber}
        />
      ) : (
        <Loader />
      )}

      <Box sx={{ marginTop: '2.5rem' }}>
        <CardEmailForm orderId={orderNumber} />
      </Box>
    </RootStyled>
  );
};

export default Order;
