import React, { useState, useEffect, useCallback } from "react"
import AlbumsBlockCSS from "./AlbumsBlock.module.css"
import CreateList from "../../../components/CreateList/CreateList"
import Service from "../../../services/service-user"
import ServiceAlbum from "../../../services/service-album"
import ServicePhoto from "../../../services/service-photo"
import { connect } from "react-redux"
import { User } from "../../../Redux/interfaces/user.interface"
import { UserOwnerThisPageInterface } from "../../../Redux/interfaces/userOwnerThisPage.interface"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"

type AlbumsBlockProps = {
  user: User
  userOwnerThisPage: UserOwnerThisPageInterface
}

const AlbumsBlock: React.FC<AlbumsBlockProps> = ({
  user,
  userOwnerThisPage
}) => {
  const [albumsUserOwnerPage, setAlbumsUserOwnerPage]: any = useState("")
  const [stateLoading, setStateLoading]: any = useState("loading")

  const getList = useCallback(async () => {
    try {
      const albums = await Service.getListAlbumsWithPhotosByUserID(
        userOwnerThisPage._id
      )
      setAlbumsUserOwnerPage(albums)
      setStateLoading("loaded")
    } catch (e) {
      console.log(e)
    }
  }, [userOwnerThisPage._id])

  useEffect(() => {
    getList()
  }, [getList])

  const editHandler = async (id: number) => {}

  const removeHandler = async (id: number) => {
    setStateLoading("loading")
    await ServiceAlbum.removeHandler(id)
    getList()
  }

  const addChangeHandler = async (e: any) => {
    const arrayFiles = e.target.files
    const data = await ServiceAlbum.addAlbum(userOwnerThisPage._id)
    const idAlbum = data.album._id
    await ServicePhoto.addPhotosIntoFsAndAlbum(
      userOwnerThisPage._id,
      idAlbum,
      arrayFiles
    )
    getList()
  }

  const handleSubmit = (e: any) => {}

  return (
    <Box className={AlbumsBlockCSS.main__user_profile__albums_block}>
      {stateLoading === "loading" && <h1>Ожидайте ответа</h1>}
      {stateLoading === "loaded" && (       
        <CreateList
          arr={albumsUserOwnerPage}
          removeHandler={removeHandler}
          editHandler={editHandler}
          createListFunction={"CreateListAlbums"}          
        />
      )}      
      <Button
        variant="outlined"
        component="button"
        onClick={(e: any) => handleSubmit(e)}
        className={AlbumsBlockCSS.albums_block__button}
      >
        <p>ADD ALBUM</p>
        <input
          className={AlbumsBlockCSS.label__input}
          type="file"
          multiple
          onChange={e => {
            addChangeHandler(e)
          }}
        />{" "}
      </Button>     
      {stateLoading !== "loading" && stateLoading !== "loaded" && (
        <h1>ошибка</h1>
      )}
    </Box>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  userOwnerThisPage: state.userOwnerThisPage.userOwnerThisPage
})

export default connect(mapStateToProps)(AlbumsBlock)
