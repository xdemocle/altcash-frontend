import { Theme } from '@mui/material';
import { green } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { strPxRem } from '../common/utils';

const useStyles = makeStyles(({ breakpoints, typography, spacing }: Theme) => ({
  root: {
    position: 'relative',
    maxWidth: '64rem',
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
  },
  title: {
    lineHeight: '3rem',
    marginTop: '-3.25rem !important'
  },
  buttonLoadMore: {
    margin: '0 auto'
  },
  rightIcon: {
    marginLeft: strPxRem(spacing(1))
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  bottomListWrapper: {
    position: 'relative',
    textAlign: 'center',
    margin: strPxRem(spacing(1))
  },
  paper: {
    margin: '1rem 0'
  },
  tabRoot: {
    maxWidth: 'none',
    minWidth: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textDecoration: 'none !important'
  }
}));

export default useStyles;
