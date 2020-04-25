import React, { useEffect, useCallback, MouseEventHandler } from "react"
import { NavLink } from "react-router-dom"
import NavbarRenderCSS from "./NavbarRender.module.css"
import { User } from "../../../Redux/entitiesInterface/user.interface"
import {
  AppBar,
  Toolbar,
  ListItem,
  Typography,
  Avatar,
  Box,
} from "@material-ui/core"

type NavbarRenderProps = {
  user: User,
  loadingState: String,
  handlerLogOut: any,
}

const NavbarRender: React.FunctionComponent<NavbarRenderProps> = ({
  user,
  loadingState,
  handlerLogOut,
}) => {
  return (
    <>
      <Box component="div" className="navbar__user">
        <Typography
          variant="h6"
          className={`${NavbarRenderCSS.navbar__avatar__brand_logo} brand-logo`}
        >
          {(user.login && `Hello, ${user.login}`) || "Hello, incognito"}
        </Typography>
        <Avatar
          className={NavbarRenderCSS.navbar__avatar}
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
          <NavLink to={(user._id && "/social-network-client") || "/SignUp"}>
            <Typography variant="h6">
              {(user._id && "Log Out") || "Sign Up"}
            </Typography>
          </NavLink>
        </ListItem>
      </Toolbar>
    </>
  )
}

export default NavbarRender
