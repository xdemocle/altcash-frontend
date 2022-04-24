import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
