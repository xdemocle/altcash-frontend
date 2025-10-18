import {
  ContactSupport,
  Home,
  MonetizationOn,
  People
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, ChangeEvent } from 'react';

const SimpleBottomNavigation = () => {
  const router = useRouter();
  const [pathname, setPathname] = useState(router.pathname);

  const handleChange = (event: ChangeEvent<unknown>, newValue: string) => {
    router.push(newValue);
    setPathname(newValue);
  };

  return (
    <BottomNavigation
      value={pathname}
      onChange={handleChange}
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%'
      }}
      showLabels
    >
      <BottomNavigationAction label="Home" icon={<Home />} value="/" />
      <BottomNavigationAction
        label="Buy"
        icon={<MonetizationOn />}
        value="/buy"
      />
      <BottomNavigationAction
        label="About Us"
        icon={<People />}
        value="/about"
      />
      <BottomNavigationAction
        label="Support"
        icon={<ContactSupport />}
        value="/support"
      />
    </BottomNavigation>
  );
};

export default SimpleBottomNavigation;
