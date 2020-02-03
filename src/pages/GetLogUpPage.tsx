import React, { useState } from "react"
import Service from "../services/service-user"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../components/FormDataUsers"

export const GetLogUpPage: React.FC = () => {
  const history = useHistory()
  // const [user]  

  const logUpHandler = async (id: number, user: any) => {     
    await Service.getTokenForRegistration(id, user)
    history.push("/users/all")    
  }

  return (
    <>
      <h1>Join us</h1>      
      <FormDataUsers user={{}} submitHandler={logUpHandler} namePage = 'Join' />
    </>
  )
}
