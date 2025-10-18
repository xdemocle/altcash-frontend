import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ClientOnly from '../../atoms/client-only';
import TopNav from '../../molecules/top-nav';
import Bottombar from '../../organisms/bottom-bar';
import BottomNav from '../../organisms/bottom-nav';
import Sidebar from '../../organisms/sidebar';

const AppFrame = styled('div')(({ theme }) => ({
  zIndex: 1,
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  margin: '0 auto'
}));

const Inner = styled('div')(({ theme }) => ({
  display: 'flex',
  paddingTop: '4rem',
  [theme.breakpoints.up('sm')]: {
    paddingTop: '0'
  }
}));

const Content = styled('main')(({ theme }) => ({
  position: 'relative',
  flexGrow: 1,
  minHeight: 'calc(100vh - 36px)',
  paddingBottom: theme.typography.pxToRem(36),
  backgroundColor: '#f4f5f4',
  [theme.breakpoints.only('xs')]: {
    minHeight: 'calc(100vh - 56px)',
    paddingBottom: theme.typography.pxToRem(56)
  }
}));

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <AppFrame>
      <Inner>
        <Sidebar />
        <Content>{children}</Content>
      </Inner>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <TopNav />
      </Box>

      <ClientOnly>
        <Bottombar />
      </ClientOnly>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <BottomNav />
      </Box>
    </AppFrame>
  );
};

export default DefaultLayout;
