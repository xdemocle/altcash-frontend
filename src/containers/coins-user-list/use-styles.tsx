import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({ typography, spacing }: Theme) => ({
  root: {
    // padding: typography.pxToRem(strPxRem(spacing(1)))
    // [breakpoints.only('xs')]: {
    //   padding: theme.typography.pxToRem(theme.spacing(1.5))
    // }
  }
}));

export default useStyles;
