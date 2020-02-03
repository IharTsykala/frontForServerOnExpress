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
    history.replace(`/users/all`)
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
  return (
    <>
      {load === "loading" && <h1>Ожидайте ответа</h1>}
      {load === "loaded" && (
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
      )}
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}
