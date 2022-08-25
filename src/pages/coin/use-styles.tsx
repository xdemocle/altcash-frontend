import { Theme } from '@mui/material';
import { green } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { strPxRem } from '../../common/utils';

const useStyles = makeStyles(
  ({ breakpoints, palette, spacing, typography }: Theme) => ({
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
    },
    inner: {
      position: 'relative',
      maxWidth: '64rem'
    },
    title: {
      lineHeight: '3rem'
    },
    pageAvatar: {
      position: 'absolute',
      top: 0,
      right: 0
    },
    infoParagraph: {
      margin: '1rem 0',
      fontWeight: 500
    },
    dataParagraph: {
      marginBottom: '2.5rem'
    },
    column: {
      flexBasis: 0
    },
    progress: {
      color: green[500]
    },
    backButton: {
      marginBottom: typography.pxToRem(strPxRem(spacing(1)))
    },
    boxBuy: {
      marginBottom: typography.pxToRem(strPxRem(spacing(5)))
    },
    card: {
      padding: typography.pxToRem(strPxRem(spacing(2))),
      marginBottom: typography.pxToRem(strPxRem(spacing(3)))
    },
    links: {
      marginBottom: typography.pxToRem(strPxRem(spacing(3)))
    },
    paper: {
      padding: typography.pxToRem(strPxRem(spacing(2))),
      margin: typography.pxToRem(strPxRem(spacing(1))),
      marginBottom: typography.pxToRem(strPxRem(spacing(2))),
      lineHeight: typography.pxToRem(strPxRem(spacing(3))),
      color: palette.text.secondary
    }
  })
);

export default useStyles;
