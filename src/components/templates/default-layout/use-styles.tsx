import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#e3e4e9'
  },
  appFrame: {
    zIndex: 1,
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    margin: '0 auto'
  },
  inner: {
    display: 'flex',
    paddingTop: '4rem',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '0'
    }
  },
  content: {
    position: 'relative',
    flexGrow: 1,
    minHeight: 'calc(100vh - 36px)',
    paddingBottom: theme.typography.pxToRem(36),
    backgroundColor: '#f4f5f4',
    [theme.breakpoints.only('xs')]: {
      minHeight: 'calc(100vh - 56px)',
      paddingBottom: theme.typography.pxToRem(56)
    }
  }
}));

export default useStyles;
