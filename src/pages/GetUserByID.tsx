import React, { useEffect, useState } from "react"
import Service from "../services/service-user"
import { useHistory } from "react-router-dom"

export const GetUserByID: React.FC = (props: any) => {
  const [user, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const { id } = props.match.params
  const history = useHistory()

  const exitHandler = () => {
    history.push(`/users/all`)
  }

  useEffect(() => {
    ;(async () => {
      const user = await Service.getUserByID(setUsers, setLoad, id)

      const fieldsUser = Object.entries(user).filter(
        fild =>
          fild[0] === "role" ||
          fild[0] === "name" ||
          fild[0] === "login" ||
          fild[0] === "phone"
      )
      setLoad("loaded")
      setUsers(fieldsUser)
    })()
  }, [])

  if (load === "loading") {
    return (
      <>
        <h1>Ожидайте ответа</h1>
      </>
    )
  }
  if (load === "loaded") {
    return (
      <>
        <ul>
          {user.map((fild: any, index: any) => (
            <li key={index}>
              <p>{`${fild[0]}: ${fild[1]}`}</p>
            </li>
          ))}
        </ul>
        <i
          className="material-icons blue-text edit"
          // onClick={event => editHandler(event, user, history)}
        >
          edit
        </i>
        <i className="material-icons red-text" onClick={event => exitHandler()}>
          {" "}
          close
        </i>
      </>
    )
  } else {
    console.log("hi3")
    return (
      <>
        <h1>ошибка</h1>
      </>
    )
  }
}
