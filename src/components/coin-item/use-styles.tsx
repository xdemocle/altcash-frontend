import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  column: {
    maxWidth: '35%'
  },
  ticker: {
    maxWidth: '30%'
  },
  listItem: {
    'a&': {
      textDecoration: 'none',
      color: '#2B3A41'
    },
    'a:hover&': {
      backgroundColor: 'rgba(24, 161, 30, 0.1)'
    }
  }
}));

export default useStyles;
