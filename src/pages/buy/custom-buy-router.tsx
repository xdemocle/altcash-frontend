import { useRouter } from 'next/router';
import {
  BUY_TAB_ALL,
  BUY_TAB_FAVOURITE,
  BUY_TAB_FEATURED
} from '../../common/constants';
import useGlobal from '../../hooks/use-global';

const CustomBuyRouter = () => {
  const router = useRouter();
  const { tab } = useGlobal();

  let slug = 'featured';

  if (tab === BUY_TAB_FEATURED) {
    slug = 'featured';
  } else if (tab === BUY_TAB_ALL) {
    slug = 'all';
  } else if (tab === BUY_TAB_FAVOURITE) {
    slug = 'favourite';
  }

  return router.push(`/buy/${slug}`);
};

export default CustomBuyRouter;
