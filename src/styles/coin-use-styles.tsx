import { Theme } from '@mui/material';
import { green } from '@mui/material/colors';
import { makeStyles } from 'tss-react/mui';
import { strPxRem } from '../common/utils';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    paddingTop: theme.typography.pxToRem(strPxRem(theme.spacing(2))),
    marginLeft: theme.typography.pxToRem(strPxRem(theme.spacing(2))),
    paddingBottom: theme.typography.pxToRem(strPxRem(theme.spacing(2))),
    marginRight: theme.typography.pxToRem(strPxRem(theme.spacing(2))),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.typography.pxToRem(strPxRem(theme.spacing(2))),
      marginLeft: theme.typography.pxToRem(strPxRem(theme.spacing(5))),
      paddingBottom: theme.typography.pxToRem(strPxRem(theme.spacing(5))),
      marginRight: theme.typography.pxToRem(strPxRem(theme.spacing(5)))
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
    marginBottom: theme.typography.pxToRem(strPxRem(theme.spacing(1)))
  },
  boxBuy: {
    marginBottom: theme.typography.pxToRem(strPxRem(theme.spacing(5)))
  },
  card: {
    padding: theme.typography.pxToRem(strPxRem(theme.spacing(2))),
    marginBottom: theme.typography.pxToRem(strPxRem(theme.spacing(3)))
  },
  links: {
    marginBottom: theme.typography.pxToRem(strPxRem(theme.spacing(3)))
  },
  paper: {
    padding: theme.typography.pxToRem(strPxRem(theme.spacing(2))),
    margin: theme.typography.pxToRem(strPxRem(theme.spacing(1))),
    marginBottom: theme.typography.pxToRem(strPxRem(theme.spacing(2))),
    lineHeight: theme.typography.pxToRem(strPxRem(theme.spacing(3))),
    color: theme.palette.text.secondary
  }
}));

export default useStyles;
