import React from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"

const token = () => {
  return localStorage.getItem("token") ? true : false
}

const admin = () => {
  return localStorage.getItem("userRole") === "admin" ? true : false
}

export interface PrivateRouteForAdminsProps extends RouteProps {
  isAuthenticated: () => {}
  authenticationPath: string
  isAdmin: () => {}
  restrictedAdminPath: string
}

export const defaultPrivateRouteForAdminsProps: PrivateRouteForAdminsProps = {
  isAuthenticated: token,
  authenticationPath: "/user/LogIn",
  isAdmin: admin,
  restrictedAdminPath: "/user/All"
}

export const PrivateRouteForAdmins: React.FC<PrivateRouteForAdminsProps> = props => {
  let redirectPath = ""
  if (!props.isAuthenticated()) {
    redirectPath = props.authenticationPath
  }
  if (props.isAuthenticated() && !props.isAdmin()) {
    console.log(props.isAdmin())
    redirectPath = props.restrictedAdminPath
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />
    return <Route {...props} component={renderComponent} render={undefined} />
  } else {
    return <Route {...props} />
  }
}
