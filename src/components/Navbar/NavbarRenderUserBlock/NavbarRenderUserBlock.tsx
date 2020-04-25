import React from "react"
import NavbarRenderUserBlockCSS from "./NavbarRenderUserBlock.module.css"
import { User } from "../../../Redux/entitiesInterface/user.interface"
import { Typography, Avatar, Box } from "@material-ui/core"

type NavbarRenderUserBlockProps = {
  user: User,
}

const NavbarRenderUserBlock: React.FunctionComponent<NavbarRenderUserBlockProps> = ({
  user,
}) => {
  return (
    <Box
      component="div"
      className={NavbarRenderUserBlockCSS.navbar__user_block__container}
    >
      <Typography
        variant="h5"
        className={NavbarRenderUserBlockCSS.navbar__user_block__name}
      >
        {(user.login && `Hello, ${user.login}`) || "Hello, incognito"}
      </Typography>
      <Avatar
        className={NavbarRenderUserBlockCSS.navbar__user_block__avatar}
        src={
          (user.avatar &&
            `http://localhost:8080/images/users/${user._id}/${user.avatar}`) ||
          "http://localhost:8080/images/pattern-avatar.jpg"
        }
        alt="avatar"
      />
    </Box>
  )
}

export default NavbarRenderUserBlock
