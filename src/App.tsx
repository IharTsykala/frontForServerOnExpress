import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { GetAllUsers } from "./pages/GetAllUsers"
import { GetUserByID } from "./pages/GetUserByID"

const App: React.FC = () => {
  return (
    <BrowserRouter>      
      <main className="main">
        <Switch>          
          <Route component={GetAllUsers} path="/users/all" exact />
          <Route component={GetUserByID} path="/user/:id" exact />          
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
