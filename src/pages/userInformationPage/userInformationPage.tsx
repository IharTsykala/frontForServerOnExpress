import React, { useEffect, useState, useCallback } from "react"
import userInformationPageCSS from "./userInformationPage.module.css"
import AvatarBlock from "./AvatarBlock/AvatarBlock"
import InformationBlock from "./InformationBlock/InformationBlock"
import NavigationBlock from "./NavigationBlock/NavigationBlock"
import AlbumsBlock from "./AlbumsBlock/AlbumsBlock"
import Box from "@material-ui/core/Box"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { UserOwnerThisPageInterface } from "../../Redux/interfaces/userOwnerThisPage.interface"
import { getUserOwnerThisPageActionForSagas} from "../../Redux/store/userOwnerThisPage/userOwnerThisPage.actions"
import { getAvatarAction } from "../../Redux/store/avatar/avatar.actions"

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
  
  const [avatarForFront, setAvatarForFront] = useState("")
  const [avatarForBack, setAvatarForBack] = useState("")
  const [homePageStatus, setHomePageStatus] = useState(false)
  const idUserOwnerPage = match.params.id

  const render = useCallback(async () => { 
     if(idUserOwnerPage) dispatch(getUserOwnerThisPageActionForSagas(idUserOwnerPage))    
    if (idUserOwnerPage === user._id) setHomePageStatus(true)    
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
      dispatch(getAvatarAction(avatarForBack, userOwnerThisPage, user, avatarForFront))    
  }

  return (
    <div className={userInformationPageCSS.container__user_information_page}>
      <Box
        component="section"
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
        component="section"
        display="block"
        p={1}
        m={1}
        bgcolor="background.paper"
      >
        <InformationBlock homePageStatus={homePageStatus}/>
      </Box>
      <Box
        component="section"
        display="block"
        p={1}
        m={1}
        bgcolor="background.paper"
      >
        <NavigationBlock />
      </Box>
      <Box
        component="section"
        display="block"
        p={1}
        m={1}
        bgcolor="background.paper"
      >
        <AlbumsBlock homePageStatus={homePageStatus}/>
      </Box>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  userOwnerThisPage: state.userOwnerThisPageForSagas.userOwnerThisPage
})

export default connect(mapStateToProps)(UserInformationPage)
