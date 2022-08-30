import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isServer } from '../../../common/utils';

const ScrollToTop = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isServer()) {
      window.scrollTo(0, 0);
    }
  }, [router.pathname]);

  return null;
};

export default ScrollToTop;
