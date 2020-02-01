import React, { useEffect, useState } from "react"
import Service from "../services/service-user"
import { useHistory } from "react-router-dom"

export const GetAllUsers: React.FC = () => {
  const [users, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const history = useHistory()

  const removeHandler = async (id: number) => {
    setLoad("loading")
    await Service.removeHandler(id)
    // history.replace(`/users/all`)
    history.go(0)
  }

  const editHandler = (id: number) => {
    history.push(`/user/${id}`)
  }

  useEffect(() => {
    ;(async () => {
      const users = await Service.getAllUsers()
      setLoad("loaded")
      setUsers(users)
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
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>
            <p>{user.login}</p>
            <i
              className="material-icons blue-text edit"
              onClick={event => editHandler(user._id)}
            >
              edit
            </i>
            <i
              className="material-icons red-text"
              onClick={event => removeHandler(user._id)}
            >
              delete
            </i>
          </li>
        ))}
      </ul>
    )
  } else {
    return (
      <>
        <h1>ошибка запроса</h1>
      </>
    )
  }
}
