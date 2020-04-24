import React, { useEffect, useCallback } from "react"
import { NavLink } from "react-router-dom"
import NavbarCSS from "./Navbar.module.css"
import { connect } from "react-redux"
import { User } from "../../Redux/entitiesInterface/user.interface"
import { getUserRefresh } from "../../Redux/store/user/user.actions"
import { logOutUserForAllDevices } from "../../Redux/store/user/user.actions"
import {
  AppBar,
  Toolbar,
  ListItem,
  Typography,
  Avatar,
  Box,
} from "@material-ui/core"

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
          <>
            <Box component="div" className="navbar__user">
              <Typography
                variant="h6"
                className={`${NavbarCSS.navbar__avatar__brand_logo} brand-logo`}
              >
                {(user.login && `Hello, ${user.login}`) || "Hello, incognito"}
              </Typography>
              <Avatar
                className={NavbarCSS.navbar__avatar}
                src={
                  (user.avatar &&
                    `http://localhost:8080/images/users/${user._id}/${user.avatar}`) ||
                  "http://localhost:8080/images/pattern-avatar.jpg"
                }
                alt="avatar"
              />
            </Box>
            <Toolbar component="ul" className="right hide-on-med-and-down">
              <ListItem component="li" button={(!user._id && false) || true}>
                {user._id && (
                  <NavLink to={`/user/profile/${user._id}`}>
                    <Typography variant="h6">UserProfile</Typography>
                  </NavLink>
                )}
              </ListItem>
              <ListItem button={(!user._id && false) || true}>
                {user._id && (
                  <NavLink to={`/user/allUsers`}>
                    <Typography variant="h6">All Users</Typography>
                  </NavLink>
                )}
              </ListItem>
              <ListItem button>
                <NavLink to={(user._id && `/${user._id}/dialogs`) || "/LogIn"}>
                  <Typography variant="h6">
                    {(user._id && "My Dialogs") || "Log In"}
                  </Typography>
                </NavLink>
              </ListItem>

              <ListItem
                button
                onClick={() => {
                  user._id && handlerLogOut()
                }}
              >
                <NavLink
                  to={(user._id && "/social-network-client") || "/SignUp"}
                >
                  <Typography variant="h6">
                    {(user._id && "Log Out") || "Sign Up"}
                  </Typography>
                </NavLink>
              </ListItem>
            </Toolbar>
          </>
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
