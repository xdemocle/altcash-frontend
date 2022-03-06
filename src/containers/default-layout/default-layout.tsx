import { Hidden } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Bottombar from '../../components/bottom-bar';
import BottomNav from '../../components/bottom-nav';
import Sidebar from '../../components/sidebar';
import useStyles from './use-styles';

const DefaultLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.appFrame}>
      <div className={classes.inner}>
        <Sidebar />
        <main className={classes.content}>
          <Outlet />
        </main>
      </div>
      <Hidden smDown>
        <Bottombar />
      </Hidden>
      <Hidden mdUp>
        <BottomNav />
      </Hidden>
    </div>
  );
};

export default DefaultLayout;
