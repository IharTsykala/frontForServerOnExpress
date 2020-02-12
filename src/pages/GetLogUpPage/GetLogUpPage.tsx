import React, { useContext } from "react"
import Service from "../../services/service-user"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../../components/FormDataUsers"
import {
  UserFormViewModes,
  UserFormViewButtons
} from "../../shared/constants/user-from-view-mode.enum"
import { Context } from "../../Context"
import GetLogUpPageCSS from "./GetLogUpPage.module.css"

export const GetLogUpPage: React.FC = () => {
  const { setUserLogin, setUserID, setUserAvatar, setUserRole } = useContext(
    Context
  )
  const history = useHistory()

  const logUpHandler = async (id: number, user: any) => {
    const data = await Service.getTokenForRegistration(id, user)
    localStorage.setItem("token", data.token)
    setUserLogin(user.login)
    setUserID(data.user._id)
    setUserAvatar(data.user.avatar)
    setUserRole(data.user.role)
    history.push(`/users/all`)
  }

  return (
    <>
      <h3 className={GetLogUpPageCSS.main__sign_up__header}>
        Make the best decision in your life
      </h3>
      <FormDataUsers
        submitHandler={logUpHandler}
        namePage={UserFormViewModes.SingUp}
        nameButton={UserFormViewButtons.SingUp}
      />
    </>
  )
}
