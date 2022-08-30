import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({ breakpoints, typography }: Theme) => ({
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
    [breakpoints.up('sm')]: {
      paddingTop: '0'
    }
  },
  content: {
    position: 'relative',
    flexGrow: 1,
    minHeight: 'calc(100vh - 36px)',
    paddingBottom: typography.pxToRem(36),
    backgroundColor: '#f4f5f4',
    [breakpoints.only('xs')]: {
      minHeight: 'calc(100vh - 56px)',
      paddingBottom: typography.pxToRem(56)
    }
  }
}));

export default useStyles;
