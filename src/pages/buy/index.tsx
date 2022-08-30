import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  BUY_TAB_ALL,
  BUY_TAB_FAVOURITE,
  BUY_TAB_FEATURED
} from '../../common/constants';
import RootCenteredStyled from '../../components/atoms/root-centered';
import Loader from '../../components/molecules/loader';
import useGlobal from '../../hooks/use-global';

const CustomBuyRouter: NextPage = () => {
  const router = useRouter();
  const { tab } = useGlobal();

  useEffect(() => {
    let slug = 'featured';

    if (tab === BUY_TAB_FEATURED) {
      slug = 'featured';
    } else if (tab === BUY_TAB_ALL) {
      slug = 'all';
    } else if (tab === BUY_TAB_FAVOURITE) {
      slug = 'favourite';
    }

    router.push(`/buy/${slug}`);
  }, [router, tab]);

  return (
    <RootCenteredStyled>
      <Loader text="Loading coins page..." centered />
    </RootCenteredStyled>
  );
};

export default CustomBuyRouter;
