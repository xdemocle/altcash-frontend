import { Typography } from '@mui/material';
import Image from 'next/image';
import { AppBarStyled } from './styled';

const TopNav = () => {
  return (
    <AppBarStyled color="secondary">
      <Typography variant="h5" color="inherit" align="left">
        <Image
          src={'/assets/logo.png'}
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
