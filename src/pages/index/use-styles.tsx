import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { strPxRem } from '../../common/utils';

const useStyles = makeStyles(
  ({ breakpoints, palette, spacing, typography }: Theme) => ({
    root: {
      flexGrow: 1
    },
    gridContainer: {
      padding: '6rem 1.5rem',
      textAlign: 'center',
      [breakpoints.only('xs')]: {
        padding: '2rem 1.5rem'
      }
    },
    gridOverlayItem: {
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      padding: '1.5rem',
      color: '#232323'
    },
    parallaxContent: {
      position: 'absolute',
      top: '50%',
      left: '0',
      width: '100%',
      padding: '3rem 1.5rem',
      transform: 'translate(0,-50%)',
      color: palette.primary.contrastText,
      textAlign: 'center',
      [breakpoints.only('xs')]: {
        position: 'static',
        transform: 'none',
        padding: '2rem 1.5rem'
      }
    },
    paper: {
      padding: strPxRem(spacing(2)),
      color: palette.text.secondary,
      textAlign: 'center'
    },
    typographyMainTitle: {
      fontWeight: '600 !important',
      textTransform: 'uppercase'
    },
    typographyShadow: {
      textShadow: '1px 1px 1px rgba(0,0,0,0.35)'
    },
    heroDivider: {
      background: '#fff',
      opacity: 0.5,
      height: '0.3rem',
      width: '65%'
    },
    ctoButton: {
      margin: typography.pxToRem(strPxRem(spacing(2))),
      padding: '.9rem ' + typography.pxToRem(strPxRem(spacing(4))),
      minHeight: 'auto',
      lineHeight: 'normal'
    },
    leftIcon: {
      marginRight: strPxRem(spacing(1))
    }
  })
);

export default useStyles;
