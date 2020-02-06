import React, { useEffect, useState } from "react"
import Service from "../services/service-user"
import { useHistory } from "react-router-dom"

export const GetAllUsers: React.FC = () => {
  const [users, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const history = useHistory()
  const [pets, setPets]: any = useState("")
  const [userIdForPets, setUserIdForPets]: any = useState("")

  const getUsers = async () => {
    const users = await Service.getAllUsers()
    setLoad("loaded")
    setUsers(users)
  }

  const getPetsHandler = async (id: any) => {
    const data = await Service.getListPetsByUserID(id)
    setUserIdForPets(id)
    setPets(data[0].pets)
  }

  const removeHandler = async (id: number) => {
    setLoad("loading")
    await Service.removeHandler(id)
    getUsers()
  }

  const editHandler = (id: number) => {
    history.push(`/user/${id}`)
  }

  const getCodeForPets = (user: any) => {
    return (
      <>
        <ul>
          {userIdForPets === user._id &&
            pets.map((pet: any) => (
              <li key={pet._id}>
                <p>{`${pet.name} ${pet.species}`}</p>
              </li>
            ))}
        </ul>
      </>
    )
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      {load === "loading" && <h1>Ожидайте ответа</h1>}
      {load === "loaded" && (
        <ul>
          {users.map((user: any) => (
            <li key={user._id}>
              <p>{user.login}</p>
              {<> {pets.length && getCodeForPets(user)} </>}
              <i
                className="material-icons blue-text edit"
                onClick={event => getPetsHandler(user._id)}
              >
                pets
              </i>
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
