import React, { useEffect, useState, useContext, useCallback } from "react"
import Service from "../../services/service-user"
import { Context } from "../../Context"
import { UserAvatar } from "../../components/UserAvatar/UserAvatar"
import { AlbumsBlock } from "../../components/AlbumsBlock/AlbumsBlock"
import UserInformation from "../../components/UserInformation/UserInformation"
import GetUserByIDCSS from "./GetUserByID.module.css"
import UserNavigation from "../../components/UserNavigation/UserNavigation"


export const GetUserByID: React.FC = (props: any) => {
  const [userOwnerPage, setUserOwnerPage]: any = useState([])
  const [stateLoading, setStateLoading]: any = useState("loading")
  const [avatarForFront, setAvatarForFront]: any = useState("")
  const [avatarForBack, setAvatarForBack]: any = useState("")
  const [homePageStatus, setHomePageStatus]: any = useState(false)
  const { userID, userRole, setUserLogin, setUserAvatar } = useContext(Context)
  const idUserOwnerPage  = props.match.params.id    

  const render = useCallback(async () => {
    try {
      const userOwnerPage = await Service.getUserByID(idUserOwnerPage)
      setUserOwnerPage(userOwnerPage)
      setStateLoading("loaded")
      if (userOwnerPage._id === userID) setHomePageStatus(true)
    } catch (e) {
      console.log(e)
    }
  }, [idUserOwnerPage, userID])

  useEffect(() => {
    render()
  }, [render])

  const handleChangeAvatar = (e: any) => {
    const target = e.target.files[0]
    if (target) {
      setAvatarForFront(URL.createObjectURL(target))
      setAvatarForBack(target)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const imgName = await Service.setImgUser(avatarForBack, idUserOwnerPage, userRole)
    await Service.editUser(idUserOwnerPage, { avatar: imgName, password: "" })
    if (idUserOwnerPage === userID) setUserAvatar(imgName)
  }

  return (
    <>
      {stateLoading === "loading" && <h1>Ожидайте ответа</h1>}
      {stateLoading === "loaded" && (
        <div className={GetUserByIDCSS.main__user_profile__container}>
          <UserAvatar
            userOwnerPage={userOwnerPage}
            avatarForFront={avatarForFront}
            handleChangeAvatar={handleChangeAvatar}
            handleSubmit={handleSubmit}
            userRole={userRole}
            homePageStatus={homePageStatus}
          />
          <UserInformation 
          userOwnerPage={userOwnerPage}          

          />
          <UserNavigation />
          <AlbumsBlock idUserOwnerPage={idUserOwnerPage}/>          
        </div>
      )}
      {stateLoading !== "loading" && stateLoading !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}
