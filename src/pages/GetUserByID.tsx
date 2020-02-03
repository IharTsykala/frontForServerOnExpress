import React, { useEffect, useState } from "react"
import Service from "../services/service-user"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../components/FormDataUsers"

export const GetUserByID: React.FC = (props: any) => {
  const [user, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const { id } = props.match.params
  const history = useHistory()

  const editSubmitHandler = async (id: number, user: any) => {
    await Service.editUser(id, user)
    history.push(`/users/all`)
  }

  const exitHandler = () => {
    history.push(`/users/all`)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const user = await Service.getUserByID(id)
        setUsers(user || {})
        setLoad("loaded")
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  return (
    <>
      <i className="material-icons red-text" onClick={event => exitHandler()}>
        {" "}
        close
      </i>
      {load === "loading" && <h1>Ожидайте ответа</h1>}
      {load === "loaded" && (
        <FormDataUsers
          user={user}
          submitHandler={editSubmitHandler}
          namePage="Edit"
        />
      )}
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}
