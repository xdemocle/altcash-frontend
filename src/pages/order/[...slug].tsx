import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import CardConfirmationOrder from '../../components/coin-buy/card-confirmation-order';
import Loader from '../../components/loader';
import RootStyled from '../../styled/root';

const Order: NextPage = () => {
  const router = useRouter();
  const { slug = [] } = router.query;

  const symbol = slug[0];
  const orderNumber = slug[1];
  const cryptoCurrency = slug[2] ? Number(slug[2]) : 0;
  const totalAmount = slug[3] ? Number(slug[3]) : 0;

  return (
    <RootStyled>
      <h1 className="display-3">Order</h1>
      {slug ? (
        <CardConfirmationOrder
          cryptoCurrency={cryptoCurrency}
          totalAmount={totalAmount}
          orderNumber={orderNumber}
          symbol={symbol}
        />
      ) : (
        <Loader />
      )}
    </RootStyled>
  );
};

export default Order;
