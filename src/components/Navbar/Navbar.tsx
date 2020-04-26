import React, { useEffect, useCallback } from "react"
import NavbarCSS from "./Navbar.module.css"
import { connect } from "react-redux"
import { User } from "../../Redux/entitiesInterface/user.interface"
import { getUserRefresh } from "../../Redux/store/user/user.actions"
import { logOutUserForAllDevices } from "../../Redux/store/user/user.actions"
import NavbarRenderUserBlock from "./NavbarRenderUserBlock/NavbarRenderUserBlock"
import { AppBar, Typography, CircularProgress } from "@material-ui/core"
import NavbarRenderNavigation from "./NavbarRenderNavigation/NavbarRenderNavigation"

type NavbarProps = {
  user: User,
  dispatch: any,
  loadingState: String,
}

const Navbar: React.FunctionComponent<NavbarProps> = ({
  user,
  dispatch,
  loadingState,
}) => {
  const getUserAfterLogInAndRefresh = useCallback(() => {
    if (localStorage.getItem("token")) dispatch(getUserRefresh())
  }, [dispatch])

  useEffect(() => {
    getUserAfterLogInAndRefresh()
  }, [getUserAfterLogInAndRefresh])

  const handlerLogOut = () => {
    dispatch(logOutUserForAllDevices(user._id, user))
  }

  return (
    <AppBar position="static" className={NavbarCSS.navbar_container}>
      {(loadingState === "loading" && (
        <CircularProgress
          color="inherit"
          className={NavbarCSS.navbar_container_spinner}
        />
      )) ||
        (loadingState === "notFound" && (
          <Typography variant="h6">
            Not found anything on your request!
          </Typography>
        )) ||
        (loadingState === "loaded" && user && (
          <>
            <NavbarRenderUserBlock user={user} />
            <NavbarRenderNavigation user={user} handlerLogOut={handlerLogOut} />
          </>
        )) ||
        (loadingState === "error" && (
          <Typography variant="h6">ERROR, try refresh page!</Typography>
        ))}
    </AppBar>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  loadingState: state.loadingState.loadingStateForNavbar,
})

export default connect(mapStateToProps)(Navbar)
