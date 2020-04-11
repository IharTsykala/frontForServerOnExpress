import React, { useEffect, useCallback } from "react"
import AlbumsBlockCSS from "./AlbumsBlock.module.css"
import CreateList from "../../../components/CreateList/CreateList"
import { connect } from "react-redux"
import { User } from "../../../Redux/interfaces/user.interface"
import { UserOwnerThisPageInterface } from "../../../Redux/interfaces/userOwnerThisPage.interface"
import { Album } from "../../../Redux/interfaces/album.interface"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import { getListAlbumsWithPhotosByUserIDAction } from "../../../Redux/store/albums/albums.action"
import { removeAlbumAction } from "../../../Redux/store/albums/albums.action"
import { addAlbumWithPhotosByUserIdAction } from "../../../Redux/store/albums/albums.action"

type AlbumsBlockProps = {
  user: User
  userOwnerThisPage: UserOwnerThisPageInterface
  albumsForUserOwnerPage: [Album]
  dispatch: any
  homePageStatus?: boolean
}

const AlbumsBlock: React.FC<AlbumsBlockProps> = ({
  user,
  userOwnerThisPage,
  albumsForUserOwnerPage,
  dispatch,
  homePageStatus
}) => {
  const getList = useCallback(() => {
    if (userOwnerThisPage._id) {
      dispatch(getListAlbumsWithPhotosByUserIDAction(userOwnerThisPage._id))
    }
  }, [dispatch, userOwnerThisPage._id])

  useEffect(() => {
    getList()
  }, [getList])

  const editHandler = (albumId: string) => {}

  const removeHandler = (albumId: string) => {
    dispatch(removeAlbumAction(albumId, userOwnerThisPage._id))
  }

  const addChangeHandler = (e: any) => {
    const arrayFiles = e.target.files
    dispatch(
      addAlbumWithPhotosByUserIdAction(userOwnerThisPage._id, arrayFiles)
    )
  }

  const handleSubmit = (e: any) => {}

  return (
    <Box className={AlbumsBlockCSS.main__user_profile__albums_block}>
      {/* {stateLoading === "loading" && <h1>Ожидайте ответа</h1>} */}
      {// stateLoading === "loaded"   &&
        albumsForUserOwnerPage.length &&
        albumsForUserOwnerPage[0]._id !== undefined && (
          <CreateList
            arr={albumsForUserOwnerPage}
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
        disabled={homePageStatus !== undefined && !homePageStatus && true}
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
      {/* {stateLoading !== "loading" && stateLoading !== "loaded" && (
        <h1>ошибка</h1>
      )} */}
    </Box>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  userOwnerThisPage: state.user.userOwnerThisPage,
  albumsForUserOwnerPage: state.albumsState.albumsForUserOwnerPage
})

export default connect(mapStateToProps)(AlbumsBlock)
