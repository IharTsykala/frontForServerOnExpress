import React, { useState, useEffect } from "react"
import Service from "../services/service-user"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../components/FormDataUsers"

export const GetLoginPage: React.FC = () => {
  const history = useHistory()
  const [loginStatus, setLoginStatus] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoginStatus(true)
    }
  }, [])

  const logInHandler = async (id: any, user: any) => {
    try {
      const data = await Service.getTokenForLogin(id, user)
      localStorage.setItem("token", data.token)
      localStorage.setItem("login", data.login)
      setLoginStatus(true)
      history.push(`/user/${data.user._id}`)
    } catch (e) {
      console.log(e)
    }
  }

  const logOutHandler = (e: any) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setLoginStatus(false)
    localStorage.removeItem("login")
  }

  const logUpHandler = (e: any) => {
    e.preventDefault()
    history.push(`/user/logUp`)
  }

  return (
    <>
      <h1>{`Login - ${loginStatus}`}</h1>
      {!loginStatus && (
        <>
          <FormDataUsers
            user={{}}
            submitHandler={logInHandler}
            namePage="LogIn"
          />
          <button onClick={e => logUpHandler(e)}>Log Up</button>
        </>
      )}
      {loginStatus && (
        <>
          <h1>{`Привет, ${localStorage.getItem("login")}`}</h1>
          <button onClick={e => logOutHandler(e)}>Log Out</button>
        </>
      )}
    </>
  )
}
