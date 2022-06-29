import { Box } from '@mui/material';
import Bottombar from '../../components/bottom-bar';
import BottomNav from '../../components/bottom-nav';
import Sidebar from '../../components/sidebar';
import TopNav from '../../components/top-nav';
import useStyles from './use-styles';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const classes = useStyles();

  return (
    <div className={classes.appFrame}>
      <div className={classes.inner}>
        <Sidebar />
        <main className={classes.content}>{children}</main>
      </div>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <TopNav />
      </Box>

      <Bottombar />

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <BottomNav />
      </Box>
    </div>
  );
};

export default DefaultLayout;
