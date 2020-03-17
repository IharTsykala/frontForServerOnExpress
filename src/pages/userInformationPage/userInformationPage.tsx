import React, { useEffect, useState, useCallback } from "react"
import userInformationPageCSS from "./userInformationPage.module.css"
import AvatarBlock from "./AvatarBlock/AvatarBlock"
import InformationBlock from "./InformationBlock/InformationBlock"
import NavigationBlock from "./NavigationBlock/NavigationBlock"
import AlbumsBlock from "./AlbumsBlock/AlbumsBlock"
import Box from "@material-ui/core/Box"
import Service from "../../services/service-user"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { userLogIn } from "../../Redux/store/userLogin/userLogin.actions"
import { UserOwnerThisPageInterface } from "../../Redux/interfaces/userOwnerThisPage.interface"
import {
  userOwnerThisPageAction,
  getUserOwnerThisPageActionForSagas
} from "../../Redux/store/userOwnerThisPage/userOwnerThisPage.actions"
import { LoadingState } from "../../shared/constants/user-from-view-mode.enum"


type UserInformationPageProps = {
  user: User
  dispatch: any
  match: any
  userOwnerThisPage: UserOwnerThisPageInterface
}

const UserInformationPage: React.FC<UserInformationPageProps> = ({
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

  const render = useCallback(async () => {
    try {
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
  }, [dispatch, idUserOwnerPage, user._id])

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
    <div className={userInformationPageCSS.container__user_information_page}>
      <Box
        component="div"
        display="grid"
        p={1}
        m={1}
        bgcolor="background.paper"       
      >
        <AvatarBlock
          homePageStatus={homePageStatus}
          avatarForFront={avatarForFront}
          handleChangeAvatar={handleChangeAvatar}
          handleSubmit={handleSubmit}
        />
      </Box>
      <Box
        component="span"
        display="block"
        p={1}
        m={1}
        bgcolor="background.paper"
      >
        <InformationBlock />
      </Box>
      <Box
        component="span"
        display="block"
        p={1}
        m={1}
        bgcolor="background.paper"
      >
        <NavigationBlock />
      </Box>
      <Box
        component="span"
        display="block"
        p={1}
        m={1}
        bgcolor="background.paper"
      >
        <AlbumsBlock />
      </Box>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  userOwnerThisPage: state.userOwnerThisPage.userOwnerThisPage
})

export default connect(mapStateToProps)(UserInformationPage)
