import React, { useState, useEffect } from "react"
import AlbumsBlockCSS from "./AlbumsBlock.module.css"
import CreateList from "../CreateList/CreateList"
import Service from "../../services/service-user"
import ServiceAlbum from "../../services/service-album"
import ServicePhoto from "../../services/service-photo"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { UserOwnerThisPageInterface } from "../../Redux/interfaces/userOwnerThisPage.interface"

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

  useEffect(() => {
    getList()
  }, [])

  async function getList() {
    try {
      const albums = await Service.getListAlbumsWithPhotosByUserID(
        userOwnerThisPage._id
      )
      setAlbumsUserOwnerPage(albums)
      setStateLoading("loaded")
    } catch (e) {
      console.log(e)
    }
  }

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

  return (
    <div className={AlbumsBlockCSS.main__user_profile__albums_block}>
      {stateLoading === "loading" && <h1>Ожидайте ответа</h1>}
      {stateLoading === "loaded" && (
        <>
          <CreateList
            arr={albumsUserOwnerPage}
            removeHandler={removeHandler}
            editHandler={editHandler}
            createListFunction={"CreateListAlbums"}
          />
        </>
      )}
      {stateLoading !== "loading" && stateLoading !== "loaded" && (
        <h1>ошибка</h1>
      )}

      <div className={AlbumsBlockCSS.photos__container_drag_and_drop}></div>
      {(userOwnerThisPage._id === user._id || user.role === "admin") && (
        <label
          className={AlbumsBlockCSS.photos__container_drag_and_drop__label}
          htmlFor="addFiles"
        >
          Add Album
          <input
            className={AlbumsBlockCSS.label__input}
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
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  userOwnerThisPage: state.userOwnerThisPage.userOwnerThisPage
})

export default connect(mapStateToProps)(AlbumsBlock)
