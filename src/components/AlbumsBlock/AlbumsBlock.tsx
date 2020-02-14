import React, { useState, useEffect, useCallback } from "react"
import AlbumsBlockCSS from "./AlbumsBlock.module.css"
import CreateList from "../CreateList/CreateList"
import Service from "../../services/service-user"
import ServiceAlbum from "../../services/service-album"
import ServicePhoto from "../../services/service-photo"
// import PhotoCard from "../PhotoCard/PhotoCard"

type AlbumsBlock = {
  id: any
  roleComponent: any
}

export const AlbumsBlock: React.FC<AlbumsBlock> = ({ id, roleComponent }) => {
  const [albums, setAlbums]: any = useState("")
  const [load, setLoad]: any = useState("loading")

  useEffect(() => {
    getList()
  }, [])

  async function getList() {
    try {
      if (roleComponent === "albumsBlock") {
        const user = await Service.getListAlbumsByUserID(id)
        setAlbums(user[0].albums)
      } else if (roleComponent === "photosBlock") {
        // const album = await ServiceAlbums.getListPhotosByAlbumID(id)
        // setAlbums(album[0].photos)
      }
      setLoad("loaded")
    } catch (e) {
      console.log(e)
    }
  }

  // const addHandler = async () => {
  //   await ServiceAlbums.addAlbum(id)
  //   getList()
  // }

  const editHandler = async (id: number) => {}

  const removeHandler = async (id: number) => {
    setLoad("loading")
    await ServiceAlbum.removeHandler(id)
    getList()
  }

  const addClickHandler = async (e: any) => {
    e.preventDefault()
    const data = await ServiceAlbum.addAlbum(id)
    getList()
    console.log(data)
  }

  const addChangeHandler = async (e: any) => {
    // try {
    let idAlbum
    const target = e.target.files
    if (roleComponent === "albumsBlock") {
      const data = await ServiceAlbum.addAlbum(id)
      idAlbum = data.album._id
    }
    if (target && idAlbum) {
      const imgNames = await ServicePhoto.setImgUser(target)
      if (roleComponent === "albumsBlock") {
        const url = await ServicePhoto.addPhotoIntoAlbum(id, idAlbum, imgNames)
        await ServiceAlbum.editAlbum(idAlbum, { avatar: url })
      } else if (roleComponent === "photosBlock") {
        await ServicePhoto.addPhoto(id, imgNames)
      }
    }
    // catch(e) {
    //   console.log(e)
    // }
    getList()
  }

  return (
    <div className={AlbumsBlockCSS.main__user_profile__albums_block}>
      {load === "loading" && <h1>Ожидайте ответа</h1>}
      {load === "loaded" && (
        <>
          <CreateList
            arr={albums}
            removeHandler={removeHandler}
            editHandler={editHandler}
            idUser={id}
            // arrUrlForNewAlbum = {arrUrl}
          />
        </>
      )}
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}

      <div className={AlbumsBlockCSS.photos__container_drag_and_drop}></div>
      <label
        className={AlbumsBlockCSS.photos__container_drag_and_drop__label}
        htmlFor="addFiles"
      >
        {roleComponent === "albumsBlock" ? "Add Album" : "Add Images"}
      </label>
      <input
        className={AlbumsBlockCSS.label__input}
        id="addFiles"
        // type={roleComponent === "albumsBlock" ? "submit" : "file"}
        type="file"
        multiple
        // onClick={e => {
        //   addClickHandler(e)
        // }}
        onChange={e => {
          addChangeHandler(e)
        }}
      />
    </div>
  )
}
