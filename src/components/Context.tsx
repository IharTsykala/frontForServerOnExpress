import React, { createContext, useState } from "react"

interface AppContextInterface {
  userLogin: any
  setUserLogin: () => {}
  userID: any
  setUserID: () => {}
}

export const Context = createContext<AppContextInterface | any>("")
export const ContextProvider: React.FC = (props: any) => {
  const [userLogin, setUserLogin]: any = useState("")
  const [userID, setUserID]: any = useState("")
  console.log(userLogin)
  //in case refresh application
  if (userLogin) localStorage.setItem("userLogin", userLogin)
  if (!userLogin && localStorage.getItem("userLogin"))
    setUserLogin(localStorage.getItem("userLogin"))
  if (userID) localStorage.setItem("userID", userID)
  if (!userID && localStorage.getItem("userID"))
    setUserID(localStorage.getItem("userID"))

  return (
    <Context.Provider
      value={{
        userLogin,
        setUserLogin,
        userID,
        setUserID
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
