import { Theme } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { strPxRem } from '../../common/utils';

const useStyles = makeStyles(({ breakpoints, typography, spacing }: Theme) => ({
  root: {
    position: 'relative',
    padding: typography.pxToRem(strPxRem(spacing(3))),
    display: 'grid'
  },
  grid: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'column',
    [breakpoints.up('md')]: {
      width: '75%',
      paddingRight: '2.5%',
      flexDirection: 'row'
    }
  },
  gridReverse: {
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    [breakpoints.up('md')]: {
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end'
    }
  },
  gridItem: {
    paddingRight: 0,
    [breakpoints.up('md')]: {
      padding: 0
      // paddingRight: typography.pxToRem(strPxRem(spacing(2)))
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
  boxBuyButtonRoot: {
    display: 'flex',
    alignItems: 'end',
    width: '100%',
    [breakpoints.up('md')]: {
      position: 'absolute',
      bottom: '1.5rem',
      right: '1.5rem',
      width: '25%'
    }
  },
  boxBuyLed: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem'
  },
  buyButtonContainer: {
    paddingBottom: '0.1rem',
    marginLeft: 0,
    marginTop: '2.5rem',
    width: '100%',
    [breakpoints.up('md')]: {
      marginLeft: typography.pxToRem(strPxRem(spacing(2))),
      marginTop: 0
    }
  },
  buyButton: {
    minHeight: '3.5rem',
    width: '100%'
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '0',
    height: 'auto',
    [breakpoints.up('md')]: {
      marginTop: '31px',
      height: '56px'
    }
  },
  arrow: {
    cursor: 'pointer',
    width: '2rem !important',
    height: '2rem !important'
  },
  arrowMobile: {
    margin: '1.5rem 0 1rem 0',
    width: '3rem !important',
    height: '3rem !important'
  }
}));

export default useStyles;
