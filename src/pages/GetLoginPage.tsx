import React, { useContext } from "react"
import Service from "../services/service-user"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../components/FormDataUsers"
import {
  UserFormViewModes,
  UserFormViewButtons
} from "../shared/constants/user-from-view-mode.enum"
import { Context } from "../components/Context"

export const GetLoginPage: React.FC = () => {
  const history = useHistory()
  const { userLogin, setUserLogin } = useContext(Context)

  const logInHandler = async (id: any, user: any) => {
    try {
      const data = await Service.getTokenForLogin(id, user)
      localStorage.setItem("token", data.token)
      setUserLogin(user.login)
      history.push(`/user/${data.user._id}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
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
