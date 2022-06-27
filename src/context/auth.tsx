import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react';

export interface AuthContextProps {
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false
} as AuthContextProps);

const IsAuthenticatedKey = 'isAuthenticated';

interface Props {
  children: ReactNode;
}

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem(IsAuthenticatedKey) === 'true'
  );

  const login = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    localStorage.setItem(IsAuthenticatedKey, isAuthenticated.toString());
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
