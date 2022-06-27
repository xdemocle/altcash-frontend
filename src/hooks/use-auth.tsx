import { useContext } from 'react';
import { AuthContext, AuthContextProps } from '../context/auth';

const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};

export default useAuth;
