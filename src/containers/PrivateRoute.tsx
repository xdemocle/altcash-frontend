import React from 'react'
import {
  Redirect,
  Route,
  RouteChildrenProps,
  RouteComponentProps
} from 'react-router'
import { useAuth } from '../context/AuthProvider'

type RouteProps = {
  component?:
    | React.ComponentType<RouteComponentProps<string>>
    | React.ComponentType<string>
  render?: (props: RouteComponentProps<string>) => React.ReactNode
  children?:
    | ((props: RouteChildrenProps<string>) => React.ReactNode)
    | React.ReactNode
  path?: string | string[]
  exact?: boolean
  sensitive?: boolean
  strict?: boolean
}

const PrivateRoute: React.FC<RouteProps> = (route) => {
  const auth = useAuth()

  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={(props) => {
        if (!auth.isAuthenticated) return <Redirect to="/login" />
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return React.createElement(route.component as any, props)
      }}
    />
  )
}
export default PrivateRoute
