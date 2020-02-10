import React, {useState, useEffect} from "react"
import AlbumsBlockCSS from './AlbumsBlock.module.css'
import CreateList from '../CreateList'
import Service from "../../services/service-user"

type AlbumsBlock = {
//   user: any
//   avatarForFront: any
//   handleChangeAvatar: any
//   handleSubmit: any
//   userRole: string
//   homePageStatus: any
id: any
}

export const AlbumsBlock: React.FC<AlbumsBlock> = (id:any) => {
    const [albums, setAlbums]:any = useState('')
    const [load, setLoad]: any = useState("loading")

    useEffect(() => {
        getList()
    },[])

      const getList = async () => {
        try {
          const albums = await Service.getListAlbumsByUserID(id)
          setAlbums(albums)
          setLoad("loaded")        
          console.log(albums)
        } catch (e) {
          console.log(e)
        }
      }

  return (
    <div className={AlbumsBlockCSS.main__user_profile__albums_block}>
        {load === "loading" && <h1>Ожидайте ответа</h1>}                
        {load === "loaded" &&<>{albums.length} <CreateList arr={albums}/></>}
        {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </div>
    
  )
}