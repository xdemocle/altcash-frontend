import { red } from '@mui/material/colors';
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
  },
  textField: {
    marginRight: strPxRem(spacing(3)),
    marginBottom: strPxRem(spacing(3)),
    display: 'block',
    '& .MuiInputBase-formControl': {
      width: '100%',
      [breakpoints.up('sm')]: {
        width: '50%'
      }
    },
    '& .MuiFormHelperText-root': {
      color: red[600]
    }
  },
  buttonField: {
    paddingLeft: strPxRem(spacing(5)),
    paddingRight: strPxRem(spacing(5)),
    height: '3.5rem'
  },
  paragraphText: {
    marginTop: strPxRem(spacing(4))
  }
}));

export default useStyles;
