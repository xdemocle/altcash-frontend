import {
  ContactSupport,
  Home,
  MonetizationOn,
  Store
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStyles from './use-styles';

const SimpleBottomNavigation = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  const handleChange = (event: ChangeEvent<unknown>, newValue: string) => {
    navigate(newValue);
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
        label="Your Area"
        icon={<Store />}
        value="/overview"
      />
      <BottomNavigationAction
        label="Support"
        icon={<ContactSupport />}
        value="/support"
      />
      {/* <BottomNavigationAction
          label="About"
          icon={<People />}
          value="/about"
        /> */}
    </BottomNavigation>
  );
};

export default SimpleBottomNavigation;
