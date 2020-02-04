import React, { useEffect, useState } from "react"
import Service from "../services/service-user"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../components/FormDataUsers"

export const GetUserByID: React.FC = (props: any) => {
  const [user, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const { id } = props.match.params
  const history = useHistory()
  const [avatarForFront, setAvatarForFront]: any = useState("")
  const [avatarForBack, setAvatarForBack]: any = useState("")

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
  }, [id])

  const editSubmitHandler = async (id: number, user: any) => {
    await Service.editUser(id, user)
    history.push(`/users/all`)
  }

  const exitHandler = () => {
    history.push(`/users/all`)
  }

  const handleChangeAvatar = (e: any) => {
    const target = e.target.files[0]
    if (target) {
      setAvatarForFront(URL.createObjectURL(target))
      setAvatarForBack(target)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const img = await Service.setImgUser(avatarForBack)
    const userUpgrade = { ...user, ...{ avatar: img } }
    setUsers(userUpgrade)
    await Service.editUser(id, userUpgrade)
  }

  return (
    <>
      <i className="material-icons red-text" onClick={event => exitHandler()}>
        {" "}
        close
      </i>
      <form action="">
        {avatarForFront && <img src={`${avatarForFront}`} alt="avatar" />}
        {!avatarForFront && (
          <img
            src={`http://localhost:8080/images/${user.avatar}`}
            alt="avatar"
          />
        )}
        <input type="file" onChange={e => handleChangeAvatar(e)} />
        <input type="submit" value="Отправить" onClick={e => handleSubmit(e)} />
      </form>
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
