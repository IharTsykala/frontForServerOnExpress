import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { Context } from "../../Context"
import { useHistory } from "react-router-dom"
import NavbarCSS from "./Navbar.module.css"

export const Navbar: React.FunctionComponent = props => {
  const {
    userLogin,
    setUserLogin,
    userID,
    setUserID,
    userAvatar,
    setUserAvatar,
    setUserRole
  } = useContext(Context)
  const history = useHistory()

  const handlerLogOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userID")
    localStorage.removeItem("userLogin")
    localStorage.removeItem("userAvatar")
    localStorage.removeItem("userRole")
    setUserLogin("")
    setUserID("")
    setUserAvatar("")
    setUserRole("")
  }

  return (
    <nav className="navbar_container">
      <div className="nav-wrapper purple darken-2 px1">
        {userLogin && (
          <>
            <a href="/" className="brand-logo">
              {`Hello, ${userLogin}`}
            </a>
            {userAvatar && (
              <img
                className={NavbarCSS.navbar__avatar}
                src={`http://localhost:8080/images/users/${userID}/${userAvatar}`}
                alt="avatar"
              />
            )}
            {!userAvatar && (
              <img
                className={NavbarCSS.navbar__avatar}
                src={`http://localhost:8080/images/pattern-avatar.jpg`}
                alt="avatar"
              />
            )}
          </>
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
                <NavLink to="/user/LogIn">Log In</NavLink>
              </li>
              <li>
                <NavLink to="/user/SignUp">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
