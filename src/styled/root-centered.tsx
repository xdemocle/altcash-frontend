import { styled } from '@mui/material/styles';
import { strPxRem } from '../common/utils';

const RootCenteredStyled = styled('div')(({ theme }) => ({
  maxWidth: '64rem',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: theme.typography.pxToRem(strPxRem(theme.spacing(2))),
  marginLeft: theme.typography.pxToRem(strPxRem(theme.spacing(2))),
  paddingBottom: theme.typography.pxToRem(strPxRem(theme.spacing(2))),
  marginRight: theme.typography.pxToRem(strPxRem(theme.spacing(2))),
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.typography.pxToRem(strPxRem(theme.spacing(2))),
    marginLeft: theme.typography.pxToRem(strPxRem(theme.spacing(5))),
    paddingBottom: theme.typography.pxToRem(strPxRem(theme.spacing(5))),
    marginRight: theme.typography.pxToRem(strPxRem(theme.spacing(5)))
  }
}));

export default RootCenteredStyled;
