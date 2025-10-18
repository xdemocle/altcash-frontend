import { Theme } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { makeStyles } from 'tss-react/mui';
import { strPxRem } from '../../../common/utils';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    position: 'relative',
    padding: theme.typography.pxToRem(strPxRem(theme.spacing(3))),
    display: 'grid'
  },
  grid: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      width: '75%',
      paddingRight: '2.5%',
      flexDirection: 'row'
    }
  },
  gridReverse: {
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end'
    }
  },
  gridItem: {
    paddingRight: 0,
    [theme.breakpoints.up('md')]: {
      padding: 0
      // paddingRight: theme.typography.pxToRem(strPxRem(theme.spacing(2)))
    }
  },
  gridTitle: {
    display: 'block',
    color: grey[600],
    fontSize: '.9rem',
    marginBottom: theme.typography.pxToRem(strPxRem(theme.spacing(1)))
  },
  symbol: {
    color: green[700]
  },
  boxBuyButtonRoot: {
    display: 'flex',
    alignItems: 'end',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '3.3rem',
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
    marginLeft: 0,
    marginTop: '2.5rem',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      paddingBottom: '1.45rem',
      marginLeft: theme.typography.pxToRem(strPxRem(theme.spacing(2))),
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
    [theme.breakpoints.up('md')]: {
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
  },
  innerCard: {
    transition: 'all 300ms !important',
    overflow: 'hidden',
    height: '0',
    width: '95%',
    margin: '0 auto',
    marginTop: '-0.1rem',
    textAlign: 'right'
  },
  innerCardOpen: {
    height: '9rem'
  },
  innerCardRoot: {
    padding: '1rem'
  },
  confirmationTitle: {
    marginTop: 0,
    color: theme.palette.primary.main
  },
  confirmationTitleRed: {
    marginTop: 0,
    color: theme.palette.error.main
  },
  confirmationLoader: {
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  confirmationGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  },
  confirmationSeparator: {
    height: 1,
    border: '0.0625rem solid',
    borderColor: theme.palette.primary.main
  }
}));

export default useStyles;
