import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
// import GetAllUsers from "./pages/GetAllUsers/GetAllUsers"
import AllUsersPage from "./pages/allUsersPage/allUsersPage"
// import GetUserByID from "./pages/GetUserByID/GetUserByID"
import UserInformationPage from "./pages/userInformationPage/userInformationPage"
import GetLoginPage from "./pages/GetLoginPage/GetLoginPage"
import GetLogUpPage from "./pages/GetLogUpPage/GetLogUpPage"
import { GetStartPage } from "./pages/GetStartPage/GetStartPage"
import Navbar from "./components/Navbar/Navbar"
import {
  PrivateRoute,
  defaultPrivateRouteProps
} from "./PrivateRoutes/PrivateRouteForUsers"
import {
  PrivateRouteForAdmins,
  defaultPrivateRouteForAdminsProps
} from "./PrivateRoutes/PrivateRouteForAdmins"
import GetAlbumByID from "./pages/GetAlbumByID/GetAlbumByID"
import PageFriends from "./pages/pageFriends/pageFriends"
import AllAlbumsPage from "./pages/allAlbumsPage/allAlbumsPage"
import AllPhotosPage from "./pages/allPhotosPage/allPhotosPage"
import NotFound from "./pages/NotFoundPage/NotFound"
import { AdminAllUsers } from "./pages/AdminPages/AdminAllUser/AdminAllUser"
import { UserEditInformation } from "./pages/UserEditInformationPage/UserEditInformationPage"
import { Provider } from "react-redux"
import rootReducer from "./Redux/store"
import DialogsPage from "./pages/DialogsPage/DialogsPage"
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import getUserOwnerThisPageForSaga from "./Redux/store/userOwnerThisPage/userOwnerThisPage.sagas"
import putInStoreNewMessageforCurrentDialogSaga from "./Redux/store/listMessagesForCurrentDialog/listMessagesForCurrentDialog.sagas"
import putInStoreAllUsersSaga from "./Redux/store/allUsers/allUsers.sagas"
import userLoginSaga from "./Redux/store/userLogin/userLogin.sagas"
import avatarSaga from "./Redux/store/avatar/avatar.sagas"
import dialogSaga from "./Redux/store/dialogs/dialogs.sagas"
import albumsSaga from "./Redux/store/albums/albums.sagas"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools({ trace: true, traceLimit: 25 })(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(getUserOwnerThisPageForSaga)
sagaMiddleware.run(putInStoreNewMessageforCurrentDialogSaga)
sagaMiddleware.run(putInStoreAllUsersSaga)
sagaMiddleware.run(userLoginSaga)
sagaMiddleware.run(avatarSaga)
sagaMiddleware.run(dialogSaga)
sagaMiddleware.run(albumsSaga)

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="wrapper">
          <Navbar />
          <main className="main">
            <Switch>
              {/* <Route component={DialogsPage} path="/:id/dialogs" exact /> */}
              <Route component={GetStartPage} path="/" exact />
              <Route component={GetLoginPage} path="/LogIn" exact />
              <Route component={GetLogUpPage} path="/SignUp" exact />
              {/* <PrivateRoute
              {...defaultPrivateRouteProps}
              component={GetAllUsers}
              path="/user/all"
              exact
            /> */}
              <PrivateRoute
                {...defaultPrivateRouteProps}
                component={DialogsPage}
                path="/:id/dialogs"
                exact
              />
              <PrivateRoute
                {...defaultPrivateRouteProps}
                component={AllUsersPage}
                path="/user/allUsers"
                exact
              />
              {/* <PrivateRoute
              {...defaultPrivateRouteProps}
              component={GetUserByID}
              path="/user/:id"
              exact
            />  */}
              <PrivateRoute
                {...defaultPrivateRouteProps}
                component={UserInformationPage}
                path="/user/profile/:id"
                exact
              />
              <PrivateRoute
                {...defaultPrivateRouteProps}
                component={PageFriends}
                path="/user/:id/friends"
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
                component={AllAlbumsPage}
                path="/user/:id/allAlbums"
                exact
              />
              <PrivateRoute
                {...defaultPrivateRouteProps}
                component={AllPhotosPage}
                path="/user/:id/allPhotos"
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
        </div>
      </BrowserRouter>
    </Provider>
  )
}
