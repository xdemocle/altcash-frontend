import { styled } from '@mui/material/styles';
import RootStyled from '../root';

const RootCenteredStyled = styled(RootStyled)(() => ({
  maxWidth: '64rem',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export default RootCenteredStyled;
