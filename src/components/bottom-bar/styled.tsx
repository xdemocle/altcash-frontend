import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: 1,
  boxShadow: 'none',
  padding: '.5rem 1.5rem',
  top: 'auto',
  bottom: 0,
  position: 'fixed',
  [theme.breakpoints.up('xl')]: {
    position: 'absolute',
    borderRadius: '.5rem .5rem 0 0'
  }
}));

const LinkStyled = styled(Link)(() => ({
  color: '#fff !important'
}));

export { AppBarStyled, LinkStyled };
