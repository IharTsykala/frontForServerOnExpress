import React, { createContext, useState } from "react"

interface AppContextInterface {
  userLogin: any
  setUserLogin: () => {}
  userID: any
  setUserID: () => {}
  userAvatar: any
  setUserAvatar: () => {}
}

export const Context = createContext<AppContextInterface | any>("")
export const ContextProvider: React.FC = (props: any) => {
  const [userLogin, setUserLogin]: any = useState("")
  const [userID, setUserID]: any = useState("")
  const [userAvatar, setUserAvatar]: any = useState("")
  console.log(userLogin)
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

  return (
    <Context.Provider
      value={{
        userLogin,
        setUserLogin,
        userID,
        setUserID,
        userAvatar,
        setUserAvatar
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
