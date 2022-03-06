import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { strPxRem } from '../../common/utils';

const useStyles = makeStyles(({ breakpoints, spacing, typography }: Theme) => ({
  root: {
    paddingTop: typography.pxToRem(strPxRem(spacing(2))),
    marginLeft: typography.pxToRem(strPxRem(spacing(2))),
    paddingBottom: typography.pxToRem(strPxRem(spacing(2))),
    marginRight: typography.pxToRem(strPxRem(spacing(2))),
    [breakpoints.up('sm')]: {
      paddingTop: typography.pxToRem(strPxRem(spacing(2))),
      marginLeft: typography.pxToRem(strPxRem(spacing(5))),
      paddingBottom: typography.pxToRem(strPxRem(spacing(5))),
      marginRight: typography.pxToRem(strPxRem(spacing(5)))
    }
  }
}));

export default useStyles;
