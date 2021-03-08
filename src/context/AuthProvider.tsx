/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useContext, useEffect, useState } from 'react'

type AuthContextProps = {
  login: () => void
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = React.createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
})

const IsAuthenticatedKey = 'isAuthenticated'

// eslint-disable-next-line react/prop-types
const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem(IsAuthenticatedKey) === 'true'
  )

  const login = useCallback(() => {
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
  }, [])

  useEffect(() => {
    localStorage.setItem(IsAuthenticatedKey, isAuthenticated.toString())
  }, [isAuthenticated])

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
  )
}

export const useAuth = (): AuthContextProps => {
  const ctx = useContext(AuthContext)
  return ctx
}

export default AuthProvider
