import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { Context } from "./Context"
import { useHistory } from "react-router-dom"

export const Navbar: React.FunctionComponent = props => {
  const { userLogin, setUserLogin, userID, setUserID } = useContext(Context)
  console.log(userLogin)
  const history = useHistory()
  // console.log(userID)

  const handlerLogOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userID")
    localStorage.removeItem("userLogin")
    localStorage.removeItem("userID")
    setUserLogin("")
    setUserID("")
  }

  return (
    <nav className="navbar_container">
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
              {history.location.pathname === "/users/all" && (
                <li>
                  <NavLink to={`/user/${userID}`}>Your Page</NavLink>
                </li>
              )}

              {history.location.pathname !== "/users/all" && (
                <li>
                  <NavLink to="/users/all">All User</NavLink>
                </li>
              )}

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
    </nav>
  )
}
