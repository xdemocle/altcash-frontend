import { Box } from '@mui/material';
import ClientOnly from '../../atoms/client-only';
import TopNav from '../../molecules/top-nav';
import Bottombar from '../../organisms/bottom-bar';
import BottomNav from '../../organisms/bottom-nav';
import Sidebar from '../../organisms/sidebar';
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

      <ClientOnly>
        <Bottombar />
      </ClientOnly>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <BottomNav />
      </Box>
    </div>
  );
};

export default DefaultLayout;
