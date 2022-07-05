import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: 1,
  boxShadow: 'none',
  padding: '.5rem 1.5rem',
  marginBottom: '3.5rem',
  position: 'static',
  [theme.breakpoints.up('sm')]: {
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    marginBottom: '0'
  }
}));

const LinkStyled = styled(Link)(() => ({
  color: '#fff !important'
}));

export { AppBarStyled, LinkStyled };
