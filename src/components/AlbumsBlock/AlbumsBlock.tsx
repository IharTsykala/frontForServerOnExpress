import React, { useState, useEffect, useCallback, createContext } from "react"
import AlbumsBlockCSS from "./AlbumsBlock.module.css"
import CreateList from "../CreateList/CreateList"
import Service from "../../services/service-user"
import ServiceAlbum from "../../services/service-album"
import ServicePhoto from "../../services/service-photo"

type AlbumsBlockProps = {
  idUserOwnerPage: any  
}

export const AlbumsBlock: React.FC<AlbumsBlockProps> = ({idUserOwnerPage}) => {
  const [albumsUserOwnerPage, setAlbumsUserOwnerPage]: any = useState("")
  const [stateLoading, setStateLoading]: any = useState("loading")

  useEffect(() => {
    getList()
  }, [])

  async function getList() {
    try {      
        const albums = await Service.getListAlbumsWithPhotosByUserID(idUserOwnerPage)        
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
      const target = e.target.files    
      const data = await ServiceAlbum.addAlbum(idUserOwnerPage)
      const idAlbum = data.album._id  
      const imgNames = await ServicePhoto.setImgUser(target)     
      await ServicePhoto.addPhotoIntoAlbum(idUserOwnerPage, idAlbum, imgNames)      
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
            createListFunction={'CreateListAlbums'}                      
          />
        </>
      )}
      {stateLoading !== "loading" && stateLoading !== "loaded" && <h1>ошибка</h1>}

      <div className={AlbumsBlockCSS.photos__container_drag_and_drop}></div>
      <label
        className={AlbumsBlockCSS.photos__container_drag_and_drop__label}
        htmlFor="addFiles"
      >
        Add Album
      </label>
      <input
        className={AlbumsBlockCSS.label__input}
        id="addFiles"        
        type="file"
        multiple        
        onChange={e => {
          addChangeHandler(e)
        }}
      />
    </div>
  )
}
