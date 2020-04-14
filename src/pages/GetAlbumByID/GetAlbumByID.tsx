import React, { useState, useEffect, useCallback } from "react"
import GetAlbumByIDCSS from "./GetAlbumByID.module.css"
import CreateList from "../../components/CreateList/CreateList"
import { Link } from "react-router-dom"
import PhotoModalWindow from "../../components/PhotoModalWindow/PhotoModalWindow"
import { connect } from "react-redux"
import { User } from "../../Redux/entitiesInterface/user.interface"
import { Photo } from "../../Redux/entitiesInterface/photo.interface"
import { getListPhotosByAlbumIdAction } from "../../Redux/store/albums/albums.action"
import { addPhotosInCurrentAlbumAction } from "../../Redux/store/albums/albums.action"
import { removePhotoFromCurrentAlbumAction } from "../../Redux/store/albums/albums.action"

type GetAlbumByIDProps = {
  user: User
  userOwnerThisPage: User
  currentAlbum: [Photo]
  loadingState: string
  match: any
  dispatch: any
}

const GetAlbumByID: React.FC<GetAlbumByIDProps> = ({
  user,
  userOwnerThisPage,
  currentAlbum,
  loadingState,
  match,
  dispatch
}) => {
  const [statusPhotoModalWindow, setStatusPhotoModalWindow]: any = useState(
    false
  )
  const [currentUrlPhotoForLoop, setCurrentUrlPhotoForLoop]: any = useState("")
  const idChosenAlbum = match.params.id

  const getList = useCallback(async () => {
    dispatch(getListPhotosByAlbumIdAction(idChosenAlbum))
  }, [dispatch, idChosenAlbum])

  useEffect(() => {
    getList()
  }, [getList, user])

  const launchTogglePhotoModalWindow = (e: any) => {
    if (!statusPhotoModalWindow) setCurrentUrlPhotoForLoop(e.target.title)
    setStatusPhotoModalWindow(!statusPhotoModalWindow)
  }

  const editHandler = async (id: string) => {}

  const removeHandler = async (photoId: string) => {
    dispatch(removePhotoFromCurrentAlbumAction(photoId, idChosenAlbum))
  }

  const addChangeHandler = async (e: any) => {
    const arrayFiles = e.target.files
    dispatch(
      addPhotosInCurrentAlbumAction(
        userOwnerThisPage._id,
        idChosenAlbum,
        arrayFiles
      )
    )
  }

  return (
    <>
      <div className={GetAlbumByIDCSS.main__user_profile__album_block}>
        {loadingState === "loading" && <h1>Ожидайте ответа</h1>}
        {loadingState === "loaded" && (
          <>
            <Link to={`/user/profile/${userOwnerThisPage._id}`}>
              <p>BACK TO ALBUM LIST</p>
            </Link>
            <CreateList
              arr={currentAlbum}
              removeHandler={removeHandler}
              editHandler={editHandler}
              idChosenAlbum={idChosenAlbum}
              createListFunction={"CreateListPhotos"}
              launchTogglePhotoModalWindow={launchTogglePhotoModalWindow}
            />
          </>
        )}
        {loadingState === "error" && <h1>ошибка</h1>}
        <div className={GetAlbumByIDCSS.photos__container_drag_and_drop}></div>
        {/* I need user for advance feature for user and loginUser and admin  */}
        {(user.role === "admin" || user._id === userOwnerThisPage._id) && (
          <label
            className={GetAlbumByIDCSS.photos__container_drag_and_drop__label}
            htmlFor="addFiles"
          >
            Add photos
            <input
              className={GetAlbumByIDCSS.label__input}
              id="addFiles"
              type="file"
              multiple
              onChange={e => {
                addChangeHandler(e)
              }}
            />
          </label>
        )}
      </div>
      {statusPhotoModalWindow && (
        <PhotoModalWindow
          arrayPhotosChosenAlbum={currentAlbum}
          launchTogglePhotoModalWindow={launchTogglePhotoModalWindow}
          currentUrlPhotoForLoop={currentUrlPhotoForLoop}
        />
      )}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  userOwnerThisPage: state.userOwnerThisPageForSagas.userOwnerThisPage,
  currentAlbum: state.albumsState.currentAlbum,
  loadingState: state.loadingState.loadingStatePhotosInCurrentAlbum
})

export default connect(mapStateToProps)(GetAlbumByID)
