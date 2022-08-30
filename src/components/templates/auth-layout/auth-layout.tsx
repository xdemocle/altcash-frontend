import { ReactNode } from 'react';
import Bottombar from '../../organisms/bottom-bar';
import useStyles from './use-styles';

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.appFrame}>
      <div className={classes.inner}>
        <main className={classes.content}>{children}</main>
      </div>
      <Bottombar />
    </div>
  );
};

export default AuthLayout;
