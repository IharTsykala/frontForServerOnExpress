import React, { createContext, useState } from "react"

interface AppContextInterface {
  userLogin: any
  setUserLogin: () => {}
  userID: any
  setUserID: () => {}
  userAvatar: any
  setUserAvatar: () => {}
  userRole: any
  setUserRole: () => {}
}

export const Context = createContext<AppContextInterface | any>("")
export const ContextProvider: React.FC = (props: any) => {
  const [userLogin, setUserLogin]: any = useState("")
  const [userID, setUserID]: any = useState("")
  const [userAvatar, setUserAvatar]: any = useState("")
  const [userRole, setUserRole]: any = useState("")

  //in case refresh application
  if (userLogin) localStorage.setItem("userLogin", userLogin)
  if (!userLogin && localStorage.getItem("userLogin"))
    setUserLogin(localStorage.getItem("userLogin"))
  if (userID) localStorage.setItem("userID", userID)
  if (!userID && localStorage.getItem("userID"))
    setUserID(localStorage.getItem("userID"))
  if (userAvatar) localStorage.setItem("userAvatar", userAvatar)
  if (!userAvatar && localStorage.getItem("userAvatar"))
    setUserAvatar(localStorage.getItem("userAvatar"))
  if (userRole) localStorage.setItem("userRole", userRole)
  if (!userRole && localStorage.getItem("userRole"))
    setUserRole(localStorage.getItem("userRole"))

  return (
    <Context.Provider
      value={{
        userLogin,
        setUserLogin,
        userID,
        setUserID,
        userAvatar,
        setUserAvatar,
        userRole,
        setUserRole
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
