import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [router.pathname]);

  return null;
};

export default ScrollToTop;
