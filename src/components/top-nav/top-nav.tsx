import { Typography } from '@mui/material';
import Logo from '../../assets/logo.png';
import { AppBarStyled } from './styled';

const TopNav = () => {
  return (
    <AppBarStyled color="secondary">
      <Typography variant="h5" color="inherit" align="left">
        <img
          src={Logo}
          alt="logo.png"
          width="48"
          style={{ verticalAlign: 'middle', marginRight: '1rem' }}
        />
        Altcash
      </Typography>
    </AppBarStyled>
  );
};

export default TopNav;
