import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { GetAllUsers } from "./pages/GetAllUsers/GetAllUsers"
import { GetUserByID } from "./pages/GetUserByID/GetUserByID"
import { GetLoginPage } from "./pages/GetLoginPage/GetLoginPage"
import { GetLogUpPage } from "./pages/GetLogUpPage/GetLogUpPage"
import { GetStartPage } from "./pages/GetStartPage/GetStartPage"
import FormDataUsers from "./components/FormDataUsers"
import { Navbar } from "./components/Navbar/Navbar"
import { ContextProvider } from "./Context"
import { PrivateRoute, defaultProtectedRouteProps } from "./PrivateRoute"

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Navbar />
        <main className="main">
          <Switch>
            <Route component={GetStartPage} path="/" exact />
            <Route component={GetLoginPage} path="/user/LogIn" exact />
            <Route component={GetLogUpPage} path="/user/SignUp" exact />
            {/* <Route  component={GetAllUsers} path="/users/all" exact /> */}
            <PrivateRoute
              {...defaultProtectedRouteProps}
              component={GetAllUsers}
              path="/users/all"
              exact
            />
            <PrivateRoute
              {...defaultProtectedRouteProps}
              component={FormDataUsers}
              path="/user/edit"
              exact
            />
            <PrivateRoute
              {...defaultProtectedRouteProps}
              component={GetUserByID}
              path="/user/:id"
              exact
            />
          </Switch>
        </main>
      </ContextProvider>
    </BrowserRouter>
  )
}

// export default App
