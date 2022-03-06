import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({ breakpoints, typography, spacing }: Theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  }
}));

export default useStyles;
