import React, { useState, useEffect, useCallback } from "react"
import GetAlbumByIDCSS from "./GetAlbumByID.module.css"
import CreateList from "../../components/CreateList/CreateList"
import ServiceAlbums from "../../services/service-album"
import ServicePhotos from "../../services/service-photo"
import { Link } from "react-router-dom"
import PhotoModalWindow from "../../components/PhotoModalWindow/PhotoModalWindow"

export const GetAlbumByID: React.FC = (props: any) => {
  const [arrayPhotosChosenAlbum, setArrayPhotosChosenAlbum]: any = useState("")
  const [idUserOwnerPage, setIdUserOwnerPage]: any = useState("")
  const [load, setLoad]: any = useState("loading")
  const [statusPhotoModalWindow, setStatusPhotoModalWindow]: any = useState(
    false
  )
  const [currentUrlPhotoForLoop, setCurrentUrlPhotoForLoop]: any = useState("")
  const idChosenAlbum = props.match.params.id

  useEffect(() => {
    getList()
  }, [])

  async function getList() {
    try {
      const album = await ServiceAlbums.getListPhotosByAlbumID(idChosenAlbum)
      setArrayPhotosChosenAlbum(album[0].photos)
      setIdUserOwnerPage(album[0].ownerUser)
      setLoad("loaded")
    } catch (e) {
      console.log(e)
    }
  }

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
    // const fileNames = await ServicePhotos.setImgUser(arrayFiles)
    // await ServicePhotos.addPhotoIntoAlbum(
    //   idUserOwnerPage,
    //   idChosenAlbum,
    //   fileNames
    // )
    await ServicePhotos.addPhotosIntoFsAndAlbum(
      idUserOwnerPage,
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
            <Link to={`/user/${idUserOwnerPage}`}>
              <p>BACK TO ALBUM LIST</p>
            </Link>
            <CreateList
              arr={arrayPhotosChosenAlbum}
              removeHandler={removeHandler}
              editHandler={editHandler}
              idUserOwnerPage={idUserOwnerPage}
              idChosenAlbum={idChosenAlbum}
              createListFunction={"CreateListPhotos"}
              launchTogglePhotoModalWindow={launchTogglePhotoModalWindow}
            />
          </>
        )}
        {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
        <div className={GetAlbumByIDCSS.photos__container_drag_and_drop}></div>
        {idUserOwnerPage === localStorage.getItem("userID") && (
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
