import React from "react"
import UserInformationCSS from "./UserInformation.module.css"
// import { useHistory } from "react-router-dom"

type UserCardProps = {
  user?: any
  removeHandler?: any
  admin?: string
}

const UserInformation: React.FC<UserCardProps> = ({
  user,
  removeHandler,
  admin
}) => {
  // const history = useHistory()
  return (
    <div className={UserInformationCSS.user_profile__user_information}></div>
  )
}

export default UserInformation
