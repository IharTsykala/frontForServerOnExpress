import React, { useState, useEffect } from "react"
import AlbumsBlockCSS from "./AlbumsBlock.module.css"
import CreateList from "../CreateList/CreateList"
import Service from "../../services/service-user"
import ServiceAlbum from "../../services/service-album"
import ServicePhoto from "../../services/service-photo"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { userLogIn } from "../../Redux/store/userLogin/userLogin.actions"

type AlbumsBlockProps = {
  idUserOwnerPage: any
  user: User
  dispatch: any
}

const AlbumsBlock: React.FC<AlbumsBlockProps> = ({
  user, dispatch,
  idUserOwnerPage
}) => {
  const [albumsUserOwnerPage, setAlbumsUserOwnerPage]: any = useState("")
  const [stateLoading, setStateLoading]: any = useState("loading")

  useEffect(() => {
    getList()
    dispatch(userLogIn(user))
    console.log(user)    
  }, [])

  async function getList() {
    try {
      const albums = await Service.getListAlbumsWithPhotosByUserID(
        idUserOwnerPage
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
    const data = await ServiceAlbum.addAlbum(idUserOwnerPage)
    const idAlbum = data.album._id
    await ServicePhoto.addPhotosIntoFsAndAlbum(
      idUserOwnerPage,
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
            idUserOwnerPage={idUserOwnerPage}
            createListFunction={"CreateListAlbums"}
          />
        </>
      )}
      {stateLoading !== "loading" && stateLoading !== "loaded" && (
        <h1>ошибка</h1>
      )}

      <div className={AlbumsBlockCSS.photos__container_drag_and_drop}></div>
      {idUserOwnerPage === user._id && (
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
  user: state.common.user
})

export default connect(mapStateToProps)(AlbumsBlock)
