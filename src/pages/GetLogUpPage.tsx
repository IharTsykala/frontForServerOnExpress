import React, { useState } from "react"
import Service from "../services/service-user"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../components/FormDataUsers"

export const GetLogUpPage: React.FC = () => {
  const history = useHistory()

  const logUpHandler = async (id: number, user: any) => {
    const data = await Service.getTokenForRegistration(id, user)
    localStorage.setItem("token", data.token)
    localStorage.setItem("login", data.user.login)
    history.push(`/user/${data.user._id}`)
  }

  return (
    <>
      <h1>Join us</h1>
      <FormDataUsers user={{}} submitHandler={logUpHandler} namePage="Join" />
    </>
  )
}
