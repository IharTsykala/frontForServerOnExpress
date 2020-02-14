import React from "react"
import UserNavigationCSS from "./UserNavigation.module.css"
// import { useHistory } from "react-router-dom"

type UserCardProps = {
  user?: any
  removeHandler?: any
  admin?: string
}

const UserNavigation: React.FC<UserCardProps> = ({
  user,
  removeHandler,
  admin
}) => {
  // const history = useHistory()
  return <div className={UserNavigationCSS.user_profile__user_navigation}></div>
}

export default UserNavigation
