import React, {useEffect} from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import  GetAllUsers  from "./pages/GetAllUsers/GetAllUsers"
import  GetUserByID  from "./pages/GetUserByID/GetUserByID"
import  GetLoginPage  from "./pages/GetLoginPage/GetLoginPage"
import { GetLogUpPage } from "./pages/GetLogUpPage/GetLogUpPage"
import { GetStartPage } from "./pages/GetStartPage/GetStartPage"
// import FormDataUsers from "./components/FormDataUsers/FormDataUsers"
import  Navbar  from "./components/Navbar/Navbar"
// import { ContextProvider } from "./Context"
import {
  PrivateRoute,
  defaultPrivateRouteProps
} from "./PrivateRoutes/PrivateRouteForUsers"
import {
  PrivateRouteForAdmins,
  defaultPrivateRouteForAdminsProps
} from "./PrivateRoutes/PrivateRouteForAdmins"
import { GetAlbumByID } from "./pages/GetAlbumByID/GetAlbumByID"
import NotFound from "./pages/NotFoundPage/NotFound"
import { AdminAllUsers } from "./pages/AdminAllUser/AdminAllUser"
import { UserEditInformation } from "./pages/UserEditInformation/UserEditInformation"
import {Provider} from "react-redux";
import rootReducer from "./Redux/store";
import ReduxPage from "./Redux/ReduxPage"
import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connect } from 'react-redux'
// import { User } from './Redux/interfaces/user.interface'
// import { userLogIn } from "./Redux/store/user/user.actions"
// import Service from "./services/service-user"
// import {Action, Dispatch} from "redux";

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware()  
));

// type AppProps = {
//   user: User,
//   dispatch: any
// }
// { user, dispatch }
// React.FC<AppProps>

export const App: React.FC = () => {
  // useEffect(() => {
  //   getUserForRefresh()    
  // }, [])
  
  // const getUserForRefresh = async() => {
  //   if (!user && localStorage.getItem("token")) {
  //     const userLog = await Service.getUserByToken()          
  //     dispatch(userLogIn(userLog))
  //     console.log(user)
  //   }
  // }  
  return (    
    <BrowserRouter>
      <Provider store={store}>
      {/* <ContextProvider> */}
        <Navbar />
        <main className="main">
          <Switch>
            <Route component={ReduxPage} path="/redux" exact />
            <Route component={GetStartPage} path="/" exact />
            <Route component={GetLoginPage} path="/LogIn" exact />
            <Route component={GetLogUpPage} path="/SignUp" exact />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={GetAllUsers}
              path="/user/all"
              exact
            />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={GetUserByID}
              path="/user/:id"
              exact
            />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={GetAlbumByID}
              path="/user/:id/album"
              exact
            />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={UserEditInformation}
              path="/user/:id/edit"
              exact
            />
            <PrivateRouteForAdmins
              {...defaultPrivateRouteForAdminsProps}
              component={AdminAllUsers}
              path="/admin/all"
              exact
            />
            <PrivateRouteForAdmins
              {...defaultPrivateRouteForAdminsProps}
              component={AdminAllUsers}
              path="/admin/:id"
              exact
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      {/* </ContextProvider> */}
      </Provider>
    </BrowserRouter>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user
})

export default connect(mapStateToProps)(App)