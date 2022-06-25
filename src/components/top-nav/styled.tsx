import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: 1,
  boxShadow: 'none',
  padding: '.5rem 1.5rem',
  position: 'fixed',
  top: '0',
  marginBottom: '0',
  background: '#43a047'
}));

export { AppBarStyled };
