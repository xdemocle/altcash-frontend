import { Theme } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { strPxRem } from '../../common/utils';

const useStyles = makeStyles(({ breakpoints, typography, spacing }: Theme) => ({
  root: {
    padding: typography.pxToRem(strPxRem(spacing(3)))
    // [breakpoints.only('xs')]: {
    //   padding: typography.pxToRem(strPxRem(spacing(2)))
    // }
  },
  grid: {
    paddingRight: typography.pxToRem(strPxRem(spacing(2))),
    [breakpoints.down('sm')]: {
      paddingRight: 0,
      marginBottom: typography.pxToRem(strPxRem(spacing(3)))
    }
  },
  gridTitle: {
    display: 'block',
    color: grey[600],
    fontSize: '.9rem',
    marginBottom: typography.pxToRem(strPxRem(spacing(1)))
  },
  symbol: {
    color: green[700]
  },
  buyButton: {
    minHeight: '3.5rem',
    width: '100%'
  },
  buyButtonInner: {
    flexGrow: 1,
    marginLeft: 0,
    paddingBottom: '0.1rem',
    [breakpoints.up('md')]: {
      marginLeft: typography.pxToRem(strPxRem(spacing(2)))
    }
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    [breakpoints.up('md')]: {
      paddingTop: '1rem'
    }
  },
  arrow: {
    width: '2.5rem',
    height: '2.5rem'
  },
  arrowMobile: {
    width: '4.5rem',
    height: '4.5rem'
  }
}));

export default useStyles;
