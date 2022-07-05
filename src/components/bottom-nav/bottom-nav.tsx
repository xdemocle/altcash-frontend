import {
  ContactSupport,
  Home,
  MonetizationOn,
  People
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, ChangeEvent } from 'react';
import useStyles from './use-styles';

const SimpleBottomNavigation = () => {
  const classes = useStyles();
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
      className={classes.root}
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
