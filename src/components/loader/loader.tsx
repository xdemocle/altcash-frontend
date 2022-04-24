import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ReactNode } from 'react';

interface Props {
  centered?: boolean;
  text?: ReactNode;
}

const Loader = ({ centered = false, text = '' }: Props) => {
  const sxStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: centered ? 'column' : 'row'
  };

  return (
    <Box sx={sxStyle}>
      <CircularProgress />
      <Box sx={{ marginLeft: centered ? '0' : '0.5rem' }}>{text}</Box>
    </Box>
  );
};

export default Loader;
