import React, { useEffect, useState, useCallback } from "react"
import Service from "../../services/service-user"
import UserAvatar from "../../components/UserAvatar/UserAvatar"
import AlbumsBlock from "../../components/AlbumsBlock/AlbumsBlock"
import UserInformation from "../../components/UserInformation/UserInformation"
import GetUserByIDCSS from "./GetUserByID.module.css"
import UserNavigation from "../../components/UserNavigation/UserNavigation"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { userLogIn } from "../../Redux/store/userLogin/userLogin.actions"
import { UserOwnerThisPageInterface } from "../../Redux/interfaces/userOwnerThisPage.interface"
import {
  userOwnerThisPageAction,
  getUserOwnerThisPageActionForSagas
} from "../../Redux/store/userOwnerThisPage/userOwnerThisPage.actions"
import { LoadingState } from "../../shared/constants/user-from-view-mode.enum"
// import {userOwnerThisPageActionForSagas} from "../../Redux/store/userOwnerThisPage/userOwnerThisPage.actions"

type GetUserByProps = {
  user: User
  dispatch: any
  match: any
  userOwnerThisPage: UserOwnerThisPageInterface
}

const GetUserByID: React.FC<GetUserByProps> = ({
  user,
  dispatch,
  match,
  userOwnerThisPage
}) => {
  const [stateLoading, setStateLoading]: any = useState(LoadingState.loading)
  const [avatarForFront, setAvatarForFront]: any = useState("")
  const [avatarForBack, setAvatarForBack]: any = useState("")
  const [homePageStatus, setHomePageStatus]: any = useState(false)
  const idUserOwnerPage = match.params.id
  console.log(stateLoading)

  const render = useCallback(async () => {
    try {
      // console.log(stateLoading)
      const userOwnerThisPageById = await Service.getUserByID(idUserOwnerPage)
      if (userOwnerThisPageById) {
        dispatch(userOwnerThisPageAction(userOwnerThisPageById))
        dispatch(getUserOwnerThisPageActionForSagas(idUserOwnerPage))
        setStateLoading(LoadingState.loaded)
      } else {
        setStateLoading(LoadingState.notFound)
      }
      if (userOwnerThisPageById._id === user._id) setHomePageStatus(true)
    } catch (e) {
      console.log(e)
      setStateLoading(LoadingState.error)
    }
  }, [])

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
    const imgName = await Service.setImgUser(
      avatarForBack,
      userOwnerThisPage._id
    )
    await Service.editUser(userOwnerThisPage._id, {
      avatar: imgName,
      password: ""
    })
    if (userOwnerThisPage._id === user._id && avatarForFront) {
      const newUser = Object.assign({}, userOwnerThisPage, { avatar: imgName })
      dispatch(userLogIn(newUser))
    }
  }

  return (
    <>
      {stateLoading === "loading" && <h1>Ожидайте ответа</h1>}
      {stateLoading === "loaded" && (
        <div className={GetUserByIDCSS.main__user_profile__container}>
          {/* <UserAvatar
            homePageStatus={homePageStatus}
            avatarForFront={avatarForFront}
            handleChangeAvatar={handleChangeAvatar}
            handleSubmit={handleSubmit}
          /> */}
          {/* <UserInformation /> */}
          {/* <UserNavigation /> */}
          <AlbumsBlock />
        </div>
      )}
      {stateLoading === "notFound" && <h1>not found</h1>}
      {stateLoading === "error" && <h1>ошибка</h1>}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  userOwnerThisPage: state.userOwnerThisPage.userOwnerThisPage
})

export default connect(mapStateToProps)(GetUserByID)
