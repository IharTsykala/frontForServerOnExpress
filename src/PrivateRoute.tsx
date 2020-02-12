import React from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"

const token = () => {
  return localStorage.getItem("token") ? true : false
}

console.log(token())

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: () => {}
  // isAllowed: boolean;
  // restrictedPath: string;
  authenticationPath: string
}

export const defaultProtectedRouteProps: ProtectedRouteProps = {
  isAuthenticated: token,
  // isAllowed: boolean,
  // restrictedPath: string,
  authenticationPath: "/user/LogIn"
}

export const PrivateRoute: React.FC<ProtectedRouteProps> = props => {
  let redirectPath = ""
  if (!props.isAuthenticated()) {
    redirectPath = props.authenticationPath
  }
  // if (props.isAuthenticated && !props.isAllowed) {
  //   redirectPath = props.restrictedPath;
  // }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />
    return <Route {...props} component={renderComponent} render={undefined} />
  } else {
    return <Route {...props} />
  }
}
