import React, { useContext } from "react"
import Service from "../services/service-user"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../components/FormDataUsers"
import {
  UserFormViewModes,
  UserFormViewButtons
} from "../shared/constants/user-from-view-mode.enum"
import { Context } from "../components/Context"

export const GetLogUpPage: React.FC = () => {
  const { setUserLogin, setUserID } = useContext(Context)
  const history = useHistory()

  const logUpHandler = async (id: number, user: any) => {
    const data = await Service.getTokenForRegistration(id, user)
    localStorage.setItem("token", data.token)
    setUserLogin(user.login)
    setUserID(data.user._id)
    history.push(`/users/all`)
  }

  return (
    <>
      <h1>Sign Up</h1>
      <FormDataUsers
        submitHandler={logUpHandler}
        namePage={UserFormViewModes.SingUp}
        nameButton={UserFormViewButtons.SingUp}
      />
    </>
  )
}
