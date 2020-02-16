import React from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"

const token = () => {
  return localStorage.getItem("token") ? true : false
}

export interface PrivateRouteProps extends RouteProps {
  isAuthenticated: () => {}
  authenticationPath: string
}

export const defaultPrivateRouteProps: PrivateRouteProps = {
  isAuthenticated: token,
  authenticationPath: "/user/LogIn"
}

export const PrivateRoute: React.FC<PrivateRouteProps> = props => {
  let redirectPath = ""
  if (!props.isAuthenticated()) {
    redirectPath = props.authenticationPath
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />
    return <Route {...props} component={renderComponent} render={undefined} />
  } else {
    return <Route {...props} />
  }
}
