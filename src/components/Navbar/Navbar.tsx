import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom"
import NavbarCSS from "./Navbar.module.css"
import { connect } from 'react-redux'
import { User } from '../../Redux/interfaces/user.interface'
import Service from "../../services/service-user"
import { userLogIn } from "../../Redux/store/userLogin/userLogin.actions"

type NavbarProps = {
  user: User,
  dispatch: any
}

const Navbar: React.FunctionComponent<NavbarProps> = ({user, dispatch}) => {  
  const history = useHistory()
   

  useEffect(() => {
    (async () => {await getUserForRefresh()})()
        
  }, [])
  
  const getUserForRefresh = async() => {
    if (!user._id && localStorage.getItem("token")) {
      const userLog = await Service.getUserByToken()      
      dispatch(userLogIn(userLog)) 
      // crutch)))
      dispatch(userLogIn(userLog)) 
      console.log(userLog)     
    }
  }  

  const handlerLogOut = async() => {
    await Service.logOutAllDevices()
    localStorage.removeItem("token")
    dispatch(userLogIn( {
      _id:    '',
      role:   '',
      login:  '',
      firstName:  '',
      lastName:   '',
      email:  '',    
      phone:  '',
      avatar: '',
      subscriptions: ''
  }))    
  }

  return (
    <nav className="navbar_container">
      <div className="nav-wrapper purple darken-2 px1">
               
        {user.login && (
          <>         
            <a href="/" className="brand-logo">
              {`Hello, ${user.login}`}
            </a>
            {user.avatar && (
              <img
                className={NavbarCSS.navbar__avatar}
                src={`http://localhost:8080/images/users/${user._id}/${user.avatar}`}
                alt="avatar"
              />
            )}
            {!user.avatar && (
              <img
                className={NavbarCSS.navbar__avatar}
                src={`http://localhost:8080/images/pattern-avatar.jpg`}
                alt="avatar"
              />
            )}
          </>
        )}
        {!user.login && (
          <a href="/" className="brand-logo">
            {`Hello, Incognito`}
          </a>
        )}        
        <ul className="right hide-on-med-and-down">
          <>
          <li>
                  <NavLink to={`/redux`}>Redux Page</NavLink>
                </li>
          {user.login && (
            <>
              {history.location.pathname === "/user/all" && (
                <li>
                  <NavLink to={`/user/${user._id}`}>Your Page</NavLink>
                </li>
              )}

              {history.location.pathname !== "/user/all" && (
                <li>
                  <NavLink to="/user/all">All User</NavLink>
                </li>
              )}

              <li onClick={() => handlerLogOut()}>
                <NavLink to="/">Log Out</NavLink>
              </li>
            </>
          )}
          {!user.login && (
            <>
              <li>
                <NavLink to="/LogIn">Log In</NavLink>
              </li>
              <li>
                <NavLink to="/SignUp">Sign Up</NavLink>
              </li>
            </>
          )}
          </>
          
        </ul>
        
      </div>
    </nav>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user
})

export default connect(mapStateToProps)(Navbar)
