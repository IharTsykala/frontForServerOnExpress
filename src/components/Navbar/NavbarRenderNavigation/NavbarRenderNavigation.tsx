import React from "react"
import { NavLink } from "react-router-dom"
import NavbarRenderNavigationCSS from "./NavbarRenderNavigation.module.css"
import { User } from "../../../Redux/entitiesInterface/user.interface"
import { Toolbar, ListItem, Button } from "@material-ui/core"

type NavbarRenderNavigationProps = {
  user: User,
  handlerLogOut: any,
}

const NavbarRenderNavigation: React.FunctionComponent<NavbarRenderNavigationProps> = ({
  user,
  handlerLogOut,
}) => {
  return (
    <Toolbar
      component="ul"
      className={NavbarRenderNavigationCSS.navbar__navigation_block__container}
    >
      <ListItem component="li">
        {user._id && (
          <NavLink to={`/user/profile/${user._id}`}>
            <Button color="inherit">User Profile</Button>
          </NavLink>
        )}
      </ListItem>

      <ListItem>
        {user._id && (
          <NavLink to={`/user/allUsers`}>
            <Button color="inherit">All Users</Button>
          </NavLink>
        )}
      </ListItem>
      <ListItem>
        <NavLink to={(user._id && `/${user._id}/dialogs`) || "/LogIn"}>
          <Button color="inherit">
            {(user._id && "My Dialogs") || "Log In"}
          </Button>
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink
          onClick={() => {
            user._id && handlerLogOut()
          }}
          to={(user._id && "/social-network-client") || "/SignUp"}
        >
          <Button color="inherit">
            {(user._id && "Log Out") || "Sign Up"}
          </Button>
        </NavLink>
      </ListItem>
    </Toolbar>
  )
}

export default NavbarRenderNavigation
