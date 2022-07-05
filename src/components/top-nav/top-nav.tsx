import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { AppBarStyled } from './styled';

const TopNav = () => {
  return (
    <AppBarStyled color="secondary">
      <Typography
        variant="h5"
        color="inherit"
        align="left"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Image src={'/assets/logo.png'} alt="logo.png" width="48" height="48" />
        <Box sx={{ marginLeft: '1rem' }}>Altcash</Box>
      </Typography>
    </AppBarStyled>
  );
};

export default TopNav;
