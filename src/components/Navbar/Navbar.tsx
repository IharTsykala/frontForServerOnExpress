import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom"
import NavbarCSS from "./Navbar.module.css"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import Service from "../../services/service-user"
import { userLogOutAction } from "../../Redux/store/userLogin/userLogin.actions"
import { userRefreshAction } from "../../Redux/store/userLogin/userLogin.actions"
import { LoadingState } from '../../shared/constants/user-from-view-mode.enum'

type NavbarProps = {
  user: User
  dispatch: any
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ user, dispatch }) => {
  const history = useHistory()
  const [stateLoading, setStateLoading]: any = useState(LoadingState.loading)

  useEffect(() => {
    getUserForRefresh()
  }, [])

  const getUserForRefresh = async () => { 
    try {
      // console.log(stateLoading)  
      if (!user._id && localStorage.getItem("token")) {
        const userLog = await Service.getUserByToken()
        if(userLog) {
          dispatch(userRefreshAction(userLog))
        setStateLoading(LoadingState.loaded) 
        } else {
          setStateLoading(LoadingState.notFound)
        }       
  }} catch(e) {
    console.log(e)
    setStateLoading(LoadingState.error)
  }
  }

  const handlerLogOut = async () => {
    try{
      await Service.logOutAllDevices()
    localStorage.removeItem("token")
    dispatch(userLogOutAction())
    } catch(e) {
      console.log(e)
    }    
  }

  return (
    <>
    {stateLoading==='loading' && <h1>Ожидайте ответа</h1>}   
     
     <nav className="navbar_container">
      <div className="nav-wrapper purple darken-2 px1">
      {stateLoading==='notFound' && (
        <p>not found</p>
      )}

        {stateLoading==='loaded' && user.login &&

         (
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
         
            <li>
              <NavLink to={`/${user._id}/dialogs`}>My Dialogs</NavLink>
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
        </ul>
      </div>
    </nav> 

    {stateLoading==='error' && <h1>ошибка</h1>}  
   </>
  )  
}

const mapStateToProps = (state: any) => ({
  user: state.common.user
})

export default connect(mapStateToProps)(Navbar)
