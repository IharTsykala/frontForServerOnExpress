import React, { useContext } from "react"
import Service from "../../services/service-user"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../../components/FormDataUsers"
import {
  UserFormViewModes,
  UserFormViewButtons
} from "../../shared/constants/user-from-view-mode.enum"
import { Context } from "../../Context"
import GetLoginPageCSS from "./GetLoginPage.module.css"

export const GetLoginPage: React.FC = () => {
  const history = useHistory()
  const { userLogin, setUserLogin, setUserID, setUserAvatar, setUserRole } = useContext(
    Context
  )

  const logInHandler = async (id: any, user: any) => {
    try {
      const data = await Service.getTokenForLogin(id, user)
      localStorage.setItem("token", data.token)
      setUserLogin(user.login)
      setUserID(data.user._id)
      setUserAvatar(data.user.avatar)
      setUserRole(data.user.role)
      history.push(`/users/all`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <h3 className={GetLoginPageCSS.main__log_in__header}>Welcome Back</h3>
      {!userLogin && (
        <>
          <FormDataUsers
            submitHandler={logInHandler}
            namePage={UserFormViewModes.LogIn}
            nameButton={UserFormViewButtons.LogIn}
          />
        </>
      )}
    </>
  )
}
