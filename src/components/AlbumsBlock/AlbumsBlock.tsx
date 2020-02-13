import React, { useState, useEffect, useCallback } from "react"
import AlbumsBlockCSS from "./AlbumsBlock.module.css"
import CreateList from "../CreateList/CreateList"
import Service from "../../services/service-user"
import ServiceAlbums from "../../services/service-album"
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
      const user = await Service.getListPhotosByUserID(id)
      setAlbums(user[0].photos)
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
    await ServiceAlbums.removeHandler(id)
    getList()
  }

  const addHandler = async (e: any) => {
    e.preventDefault()
    const target = e.target.files
    if (target) {
      const imgNames = await ServicePhoto.setImgUser(target)
      await ServiceAlbums.addPhoto(id, imgNames)
    }
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
          />
        </>
      )}
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}

      <div className={AlbumsBlockCSS.photos__container_drag_and_drop}></div>
      <label
        className={AlbumsBlockCSS.photos__container_drag_and_drop__label}
        htmlFor="addFiles"
      >
        Add Images
      </label>
      <input
        className={AlbumsBlockCSS.label__input}
        id="addFiles"
        type="file"
        multiple
        onChange={e => {
          addHandler(e)
        }}
      />
    </div>
  )
}
