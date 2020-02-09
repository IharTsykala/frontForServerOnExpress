import React, { useEffect, useState, useContext } from "react"
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

export const GetUserByID: React.FC = (props: any) => {
  const [user, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const [avatarForFront, setAvatarForFront]: any = useState("")
  const [avatarForBack, setAvatarForBack]: any = useState("")
  const [homePageStatus, setHomePageStatus]: any = useState(false)
  const [adminStatus, setAdminStatus]: any = useState(false)
  const { userID, setUserLogin, setUserAvatar } = useContext(Context)
  const { id } = props.match.params
  const history = useHistory()

  useEffect(() => {
    getUserByID(id)
  }, [id])

  const getUserByID = async (id: any) => {
    try {
      const user = await Service.getUserByID(id)
      setUsers(user)
      setLoad("loaded")
      if (user._id === userID) setHomePageStatus(true)
      else {
        const logInUser = await Service.getUserByID(userID)
        if (logInUser.role === "admin") setAdminStatus(true)
      }
    } catch (e) {
      console.log(e)
    }
  }

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
    const img = await Service.setImgUser(avatarForBack)
    await Service.editUser(id, { avatar: img, password: "" })
    setUserAvatar(img)
  }

  return (
    <>
      <UserAvatar
        user={user}
        avatarForFront={avatarForFront}
        handleChangeAvatar={handleChangeAvatar}
        handleSubmit={handleSubmit}
        adminStatus={adminStatus}
        homePageStatus={homePageStatus}
      />

      {load === "loading" && <h1>Ожидайте ответа</h1>}
      {load === "loaded" && (
        
          (
            <FormDataUsers
              user={user}
              submitHandler={editSubmitHandler}
              namePage={UserFormViewModes.Edit}
              nameButton={UserFormViewButtons.Edit}
              adminStatus={adminStatus}
              homePageStatus={homePageStatus}
            />
          )
       
      )}
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}
