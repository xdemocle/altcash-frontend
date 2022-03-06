import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { strPxRem } from '../../common/utils';

const useStyles = makeStyles(({ shadows, spacing, typography }: Theme) => ({
  root: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: '90%',
    maxWidth: spacing(50),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: shadows[5],
    padding: typography.pxToRem(strPxRem(spacing(4))),
    borderRadius: '1rem',
    outline: 'none'
  },
  fabButton: {
    width: '2rem',
    height: '2rem',
    minHeight: '2rem',
    position: 'absolute',
    top: 0,
    right: 0,
    boxShadow: 'none',
    borderRadius: '0 1rem 0'
  },
  iconSmall: {
    fontSize: '1rem'
  },
  input: {
    margin: '.5rem'
  }
}));

export default useStyles;
