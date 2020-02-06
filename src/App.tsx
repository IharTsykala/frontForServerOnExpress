import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { GetAllUsers } from "./pages/GetAllUsers"
import { GetUserByID } from "./pages/GetUserByID"
import { GetLoginPage } from "./pages/GetLoginPage"
import { GetLogUpPage } from "./pages/GetLogUpPage"
import FormDataUsers from "./components/FormDataUsers"
import { Navbar } from "./components/Navbar"
import {ContextProvider} from "./components/Context"

const App: React.FC = () => {   
  return (
    <BrowserRouter>
    <ContextProvider>
      <Navbar />
      <main className="main">
        <Switch>
          <Route component={GetLoginPage} path="/" exact />
          <Route component={GetLogUpPage} path="/user/LogUp" exact />
          <Route component={GetAllUsers} path="/users/all" exact />
          <Route component={FormDataUsers} path="/user/edit" exact />
          <Route component={GetUserByID} path="/user/:id" exact />
        </Switch>
      </main>
    </ContextProvider>
    </BrowserRouter>
  )
}

export default App
