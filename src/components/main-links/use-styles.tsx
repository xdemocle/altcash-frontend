import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({ palette }: Theme) => ({
  nav: {
    position: 'relative',
    height: 'calc(100% - 6rem)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
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
    flexGrow: '0 !important',
    position: 'relative',
    paddingLeft: '1rem',
    paddingRight: '1.8rem',
    margin: '0',
    height: '4.75rem',
    width: '100%',
    textDecoration: 'none !important',
    color: 'inherit',
    '&:visited': {
      color: 'inherit'
    },
    '&.active::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: '1.5rem',
      width: '3.2rem',
      height: '3.2rem',
      borderRadius: '.6rem',
      backgroundColor: palette.primary.main,
      zIndex: -1
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
