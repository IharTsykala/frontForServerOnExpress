import React, { useState, useEffect, useCallback } from "react"
import GetAlbumByIDCSS from "./GetAlbumByID.module.css"
import CreateList from "../../components/CreateList/CreateList"
import ServiceAlbums from "../../services/service-album"
import ServicePhotos from "../../services/service-photo"


export const GetAlbumByID: React.FC = (props:any) => {    
  const [arrayPhotosChosenAlbum, setArrayPhotosChosenAlbum]: any = useState("")
  const [idUserOwnerPage, setIdUserOwnerPage]: any = useState("")
  const [load, setLoad]: any = useState("loading")
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

  // const addHandler = async () => {
  //   await ServiceAlbums.addAlbum(id)
  //   getList()
  // }

  const editHandler = async (id: number) => {}

  const removeHandler = async (id: number) => {    
    setLoad("loading")
    await ServicePhotos.removeHandler(id)
    getList()
  }

  const addChangeHandler = async (e: any) => {    
    const target = e.target.files    
      const fileNames = await ServicePhotos.setImgUser(target)  
      await ServicePhotos.addPhotoIntoAlbum(localStorage.getItem("userID"), idChosenAlbum, fileNames)  
    getList()
  }

  return (
    <div className={GetAlbumByIDCSS.main__user_profile__albums_block}>
      {load === "loading" && <h1>Ожидайте ответа</h1>}
      {load === "loaded" && (
        <>
          <CreateList
            arr={arrayPhotosChosenAlbum}
            removeHandler={removeHandler}
            editHandler={editHandler}
            idUserOwnerPage={idUserOwnerPage}            
            idChosenAlbum={idChosenAlbum}            
            createListFunction={"CreateListPhotos"}
          />
        </>
      )}
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
      <div className={GetAlbumByIDCSS.photos__container_drag_and_drop}></div>
      <label
        className={GetAlbumByIDCSS.photos__container_drag_and_drop__label}
        htmlFor="addFiles"
      >
        Add photos       
      </label>
      <input
        className={GetAlbumByIDCSS.label__input}
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