import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { strPxRem } from '../../common/utils';

const useStyles = makeStyles(
  ({ breakpoints, palette, spacing, typography }: Theme) => ({
    root: {
      position: 'absolute',
      top: typography.pxToRem(strPxRem(spacing(3))),
      right: '0',
      [breakpoints.only('xs')]: {
        top: typography.pxToRem(strPxRem(spacing(2)))
        // position: 'relative',
        // top: 'auto',
        // right: 'auto',
        // margin: '0.5rem 0',
        // textAlign: 'center'
      }
    },
    fabButtons: {
      // display: 'inline-block',
      position: 'relative',
      marginLeft: typography.pxToRem(strPxRem(spacing(1))),
      [breakpoints.only('xs')]: {
        minWidth: 'auto',
        // paddingLeft: theme.spacing(1),
        // paddingRight: theme.spacing(1)
        padding: '.5rem .6rem'
      },
      [breakpoints.only('xs')]: {
        '.MuiButton-startIcon.MuiButton-iconSizeSmall': {
          marginRight: '0'
        },
        '.MuiButton-iconSizeSmall .MuiSvgIcon-root': {
          fontSize: '1.3rem'
        }
      }
    },
    fabProgress: {
      color: palette.primary.main,
      position: 'absolute',
      // top: -6,
      // right: -6,
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
      zIndex: 1
    },
    hide: {
      display: 'none'
    }
  })
);

export default useStyles;
