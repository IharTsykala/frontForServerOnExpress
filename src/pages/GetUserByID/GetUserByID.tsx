import React, { useEffect, useState, useContext, useCallback } from "react"
import Service from "../../services/service-user"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../../components/FormDataUsers"
import {
  UserFormViewModes,
  UserFormViewButtons
} from "../../shared/constants/user-from-view-mode.enum"
// import ListPets from "../../components/CreateList"
import { Context } from "../../Context"
import { UserAvatar } from "../../components/UserAvatar/UserAvatar"
import { AlbumsBlock } from "../../components/AlbumsBlock/AlbumsBlock"

export const GetUserByID: React.FC = (props: any) => {
  const [user, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const [avatarForFront, setAvatarForFront]: any = useState("")
  const [avatarForBack, setAvatarForBack]: any = useState("")
  const [homePageStatus, setHomePageStatus]: any = useState(false)
  const [albumState, setAlbumState]: any = useState(false)
  const { userID, userRole, setUserLogin, setUserAvatar } = useContext(Context)
  const { id } = props.match.params
  const history = useHistory()

  const render = useCallback(async () => {
    try {
      const user = await Service.getUserByID(id)
      setUsers(user)
      setLoad("loaded")
      if (user._id === userID) setHomePageStatus(true)
    } catch (e) {
      console.log(e)
    }
  }, [id, userID])

  useEffect(() => {
    render()
  }, [render])

  const editSubmitHandler = async (id: number, user: any) => {
    await Service.editUser(id, user)
    setUserLogin(user.login)
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
    const imgName = await Service.setImgUser(avatarForBack, id, userRole)
    await Service.editUser(id, { avatar: imgName, password: "" })
    if (id === userID) setUserAvatar(imgName)
  }

  const choseAlbum = () => {
    setAlbumState(true)
  }

  return (
    <>
      <UserAvatar
        user={user}
        avatarForFront={avatarForFront}
        handleChangeAvatar={handleChangeAvatar}
        handleSubmit={handleSubmit}
        userRole={userRole}
        homePageStatus={homePageStatus}
      />

      {albumState && <AlbumsBlock id={id} />}
      <button onClick={() => choseAlbum()}>фотофльбомы</button>

      {load === "loading" && <h1>Ожидайте ответа</h1>}
      {load === "loaded" && (
        <FormDataUsers
          user={user}
          submitHandler={editSubmitHandler}
          namePage={UserFormViewModes.Edit}
          nameButton={UserFormViewButtons.Edit}
          userRole={userRole}
          homePageStatus={homePageStatus}
        />
      )}
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}
