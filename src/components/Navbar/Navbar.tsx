import React, { useEffect, useCallback } from "react"
import NavbarCSS from "./Navbar.module.css"
import { connect } from "react-redux"
import { User } from "../../Redux/entitiesInterface/user.interface"
import { getUserRefresh } from "../../Redux/store/user/user.actions"
import { logOutUserForAllDevices } from "../../Redux/store/user/user.actions"
import NavbarRender from "./NavbarRender/NavbarRender"
import { AppBar, Typography } from "@material-ui/core"

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

  const handlerLogOut = () => dispatch(logOutUserForAllDevices(user._id, user))

  return (
    <AppBar position="static" className={NavbarCSS.navbar_container}>
      {(loadingState === "loading" && (
        <Typography variant="h6">Ожидайте ответа</Typography>
      )) ||
        (loadingState === "notFound" && (
          <Typography variant="h6">not found</Typography>
        )) ||
        (loadingState === "loaded" && (
          <NavbarRender
            user={user}
            loadingState={loadingState}
            handlerLogOut={handlerLogOut}
          />
        )) ||
        (loadingState === "error" && (
          <Typography variant="h6">ошибка</Typography>
        ))}
    </AppBar>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  loadingState: state.loadingState.loadingState,
})

export default connect(mapStateToProps)(Navbar)
