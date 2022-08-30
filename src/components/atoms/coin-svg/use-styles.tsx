import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  avatar: {
    padding: 0,
    verticalAlign: 'middle',
    overflow: 'visible',
    '& svg': {
      width: '2rem',
      height: '2rem',
      padding: 0,
      verticalAlign: 'middle',
      overflow: 'visible'
    }
  },
  regular: {
    width: '2rem',
    height: '2rem',
    '& svg': {
      width: '2rem',
      height: '2rem'
    }
  },
  large: {
    width: '4rem',
    height: '4rem',
    '& svg': {
      width: '4rem',
      height: '4rem'
    }
  }
}));

export default useStyles;
