import React, {useState, useEffect, useCallback} from "react"
import AlbumsBlockCSS from './AlbumsBlock.module.css'
import CreateList from '../CreateList/CreateList'
import Service from "../../services/service-user"
import ServiceAlbums from "../../services/service-album"
// import PhotoCard from "../PhotoCard/PhotoCard"

type AlbumsBlock = {
//   user: any
//   avatarForFront: any
//   handleChangeAvatar: any
//   handleSubmit: any
//   userRole: string
//   homePageStatus: any
id: any
}

export const AlbumsBlock: React.FC<AlbumsBlock> = ({id}:any) => {
    const [albums, setAlbums]:any = useState('')
    const [load, setLoad]: any = useState("loading")
    
    // useCallback(getList,[])

    useEffect(() => {    
      getList()
    },[])

     async function getList() {
        try {          
          const user = await Service.getListPhotosByUserID(id)
          console.log(user)        
          setAlbums(user[0].photos)
          setLoad("loaded")        
          console.log(user[0].albums)
        } catch (e) {
          console.log(e)
        }
      }

      const addHandler = async () => {
        console.log(id)
        await ServiceAlbums.addAlbum(id)     
        getList()
        // history.push(`/users/all`)
      }

      const editHandler = async (id: number) => {        
        console.log(id)        
      }

      const removeHandler = async (id: number) => {
        setLoad("loading")
        console.log(id)
        await ServiceAlbums.removeHandler(id)
        getList()
      }

      const addPhotoHandler =  async (e: any) => {
        e.preventDefault()
        const target = e.target.files[0]
        console.log(target)
    if (target) {
        
      const imgName = await ServiceAlbums.setImgUser(target)
      
      await ServiceAlbums.addPhoto(id, imgName)    
      // await Service.editUser(id, { avatar: imgName, password: "" })
      // setUserAvatar(imgName)    
      
    }
       
      }

  return (
    <div className={AlbumsBlockCSS.main__user_profile__albums_block}>
        {load === "loading" && <h1>Ожидайте ответа</h1>}                
        {load === "loaded" &&<><CreateList arr={albums} removeHandler={removeHandler} editHandler={editHandler} idUser={id}/><i className="material-icons" onClick={addHandler}>add</i></>}
        {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
        <input type="file" onChange={(e)=>addPhotoHandler(e)}/>
    </div>
    
  )
}