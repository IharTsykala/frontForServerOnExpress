import React, { useEffect, useState, useContext, useCallback } from "react"
import Service from "../../services/service-user"
// import { Context } from "../../Context"
import { UserAvatar } from "../../components/UserAvatar/UserAvatar"
import AlbumsBlock from "../../components/AlbumsBlock/AlbumsBlock"
import UserInformation from "../../components/UserInformation/UserInformation"
import GetUserByIDCSS from "./GetUserByID.module.css"
import UserNavigation from "../../components/UserNavigation/UserNavigation"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { userLogIn } from "../../Redux/store/userLogin/userLogin.actions"
import { UserOwnerPage } from "../../Redux/interfaces/userOwnerPage.interface"
import { userOwnerPage } from "../../Redux/store/userOwnerPage/userOwnerPage.actions"

type GetUserByProps = {
  user: User
  dispatch: any
  match: any
  userOwnerPage: UserOwnerPage
}

const GetUserByID: React.FC<GetUserByProps> = ({
  user,
  dispatch,
  match,
  userOwnerPage
}) => {
  const [userOwnerPage2, setUserOwnerPage]: any = useState([])
  const [stateLoading, setStateLoading]: any = useState("loading")
  const [avatarForFront, setAvatarForFront]: any = useState("")
  const [avatarForBack, setAvatarForBack]: any = useState("")
  const [homePageStatus, setHomePageStatus]: any = useState(false)
  // const { userID, userRole, setUserAvatar } = useContext(Context)
  const idUserOwnerPage = match.params.id

  const render = useCallback(async () => {
    try {
      const user = await Service.getUserByID(idUserOwnerPage)
      console.log(user)
      setUserOwnerPage(userOwnerPage2)
      // dispatch(userOwnerPage(user))
      setStateLoading("loaded")
      if (userOwnerPage._id === user._id) setHomePageStatus(true)
    } catch (e) {
      console.log(e)
    }
  }, [idUserOwnerPage, user])

  useEffect(() => {
    render()
    console.log(user)
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
    const imgName = await Service.setImgUser(
      avatarForBack,
      idUserOwnerPage,
      user.role
    )
    await Service.editUser(idUserOwnerPage, { avatar: imgName, password: "" })
    if (idUserOwnerPage === user._id && avatarForFront) {
      const newUser = Object.assign({}, user, { avatar: imgName })
      console.log(newUser)
      dispatch(userLogIn(newUser))
    }
  }

  return (
    <>
      {stateLoading === "loading" && <h1>Ожидайте ответа</h1>}
      {stateLoading === "loaded" && (
        <div className={GetUserByIDCSS.main__user_profile__container}>
          <UserAvatar
            userOwnerPage={userOwnerPage2}
            avatarForFront={avatarForFront}
            handleChangeAvatar={handleChangeAvatar}
            handleSubmit={handleSubmit}
            userRole={user.role}
            homePageStatus={homePageStatus}
          />
          <UserInformation userOwnerPage={userOwnerPage2} />
          <UserNavigation />
          <AlbumsBlock idUserOwnerPage={userOwnerPage2} />
        </div>
      )}
      {stateLoading !== "loading" && stateLoading !== "loaded" && (
        <h1>ошибка</h1>
      )}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  userOwnerPage: state.common.userOwnerPage
})

export default connect(mapStateToProps)(GetUserByID)
