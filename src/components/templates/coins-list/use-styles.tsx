import { Theme } from '@mui/material';
import { green } from '@mui/material/colors';
import { makeStyles } from 'tss-react/mui';
import { strPxRem } from '../../../common/utils';

const useStyles = makeStyles()((theme: Theme) => ({
  buttonLoadMore: {
    margin: '0 auto'
  },
  rightIcon: {
    marginLeft: strPxRem(theme.spacing(1))
  },
  buttonProgress: {
    color: green[100],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  bottomListWrapper: {
    position: 'relative',
    textAlign: 'center',
    margin: strPxRem(theme.spacing(1))
  },
  pagination: {
    textAlign: 'center',
    margin: '1.7rem 2rem 1.5rem 2rem'
  }
}));

export default useStyles;
