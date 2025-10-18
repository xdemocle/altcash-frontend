import { Theme } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  column: {
    maxWidth: '35%',
    textDecoration: 'none !important'
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
