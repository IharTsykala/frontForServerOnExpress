import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { Context } from "./Context"
export const Navbar: React.FunctionComponent = () => {
  const { userLogin, setUserLogin } = useContext(Context)

  const handlerLogOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("login")
    setUserLogin("")
  }

  return (
    <nav>
      <div className="nav-wrapper purple darken-2 px1">
        {userLogin && (
          <a href="/" className="brand-logo">
            {`Hello, ${userLogin}`}
          </a>
        )}
        {!userLogin && (
          <a href="/" className="brand-logo">
            {`Hello, Incognito`}
          </a>
        )}
        <ul className="right hide-on-med-and-down">
          {userLogin && (
            <>
              <li>
                <NavLink to="/users/all">All Users</NavLink>
              </li>

              <li onClick={() => handlerLogOut()}>
                <NavLink to="/">Log Out</NavLink>
              </li>
            </>
          )}
          {!userLogin && (
            <>
              <li>
                <NavLink to="/">Log In</NavLink>
              </li>
              <li>
                <NavLink to="/user/LogUp">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <h1>{userLogin}</h1>
    </nav>
  )
}
