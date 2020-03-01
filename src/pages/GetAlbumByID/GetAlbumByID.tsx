import React, { useState, useEffect, useCallback } from "react"
import GetAlbumByIDCSS from "./GetAlbumByID.module.css"
import CreateList from "../../components/CreateList/CreateList"
import ServiceAlbums from "../../services/service-album"
import ServicePhotos from "../../services/service-photo"
import { Link } from "react-router-dom"
import PhotoModalWindow from "../../components/PhotoModalWindow/PhotoModalWindow"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { UserOwnerThisPageInterface } from "../../Redux/interfaces/userOwnerThisPage.interface"

type GetAlbumByIDProps = {
  user: User
  userOwnerThisPage: UserOwnerThisPageInterface
  match: any
}

const GetAlbumByID: React.FC<GetAlbumByIDProps> = ({
  user,
  userOwnerThisPage,
  match
}) => {
  const [arrayPhotosChosenAlbum, setArrayPhotosChosenAlbum]: any = useState("")
  const [load, setLoad]: any = useState("loading")
  const [statusPhotoModalWindow, setStatusPhotoModalWindow]: any = useState(
    false
  )
  const [currentUrlPhotoForLoop, setCurrentUrlPhotoForLoop]: any = useState("")
  const idChosenAlbum = match.params.id

  const getList = useCallback(async () => {
    try {
      const album = await ServiceAlbums.getListPhotosByAlbumID(idChosenAlbum)
      // album[0] because I used aggregate for mongoDb
      setArrayPhotosChosenAlbum(album[0].photos)
      setLoad("loaded")
    } catch (e) {
      console.log(e)
    }
  }, [userOwnerThisPage])

  useEffect(() => {
    getList()
  }, [getList, user])

  const launchTogglePhotoModalWindow = (e: any) => {
    if (!statusPhotoModalWindow) setCurrentUrlPhotoForLoop(e.target.title)
    setStatusPhotoModalWindow(!statusPhotoModalWindow)
  }

  const editHandler = async (id: number) => {}

  const removeHandler = async (id: number) => {
    setLoad("loading")
    await ServicePhotos.removeHandler(id)
    getList()
  }

  const addChangeHandler = async (e: any) => {
    const arrayFiles = e.target.files
    await ServicePhotos.addPhotosIntoFsAndAlbum(
      userOwnerThisPage._id,
      idChosenAlbum,
      arrayFiles
    )
    getList()
  }

  return (
    <>
      <div className={GetAlbumByIDCSS.main__user_profile__albums_block}>
        {load === "loading" && <h1>Ожидайте ответа</h1>}
        {load === "loaded" && (
          <>
            <Link to={`/user/${userOwnerThisPage._id}`}>
              <p>BACK TO ALBUM LIST</p>
            </Link>
            <CreateList
              arr={arrayPhotosChosenAlbum}
              removeHandler={removeHandler}
              editHandler={editHandler}
              idChosenAlbum={idChosenAlbum}
              createListFunction={"CreateListPhotos"}
              launchTogglePhotoModalWindow={launchTogglePhotoModalWindow}
            />
          </>
        )}
        {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
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
          arrayPhotosChosenAlbum={arrayPhotosChosenAlbum}
          launchTogglePhotoModalWindow={launchTogglePhotoModalWindow}
          currentUrlPhotoForLoop={currentUrlPhotoForLoop}
        />
      )}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  userOwnerThisPage: state.userOwnerThisPage.userOwnerThisPage
})

export default connect(mapStateToProps)(GetAlbumByID)
