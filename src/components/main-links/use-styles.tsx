import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({ breakpoints, palette }: Theme) => ({
  nav: {
    position: 'relative',
    display: 'flex',
    height: 'calc(100% - 6rem)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
    // [breakpoints.up('xl')]: {
    //   minHeight: 'auto'
    // }
  },
  icons: {
    marginLeft: '1.3rem',
    marginRight: '1.4rem',
    color: '#A09EA0',
    '.active &': {
      color: '#fff'
    }
  },
  listItem: {
    position: 'relative',
    paddingLeft: '1.8rem',
    paddingRight: '1.8rem',
    margin: '0.8rem 0',
    height: '3.2rem',
    // color: '#2B3A41',
    '&.active::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '1.45rem',
      width: '3.2rem',
      height: '3.2rem',
      borderRadius: '.6rem',
      backgroundColor: palette.primary.main,
      zIndex: -1
    },
    'a&': {
      textDecoration: 'none',
      color: '#2B3A41'
    }
  },
  listItemText: {
    paddingLeft: '.7rem'
  },
  listItemLast: {
    position: 'absolute',
    bottom: '0'
  }
}));

export default useStyles;
