import React from "react"
import AlbumsBlock from '../../pages/userInformationPage/AlbumsBlock/AlbumsBlock';
import AllAlbumsPageCSS from "./allAlbumsPage.module.css"

  const AllAlbumsPage: React.FC = () => {
    return (
        <div className ={AllAlbumsPageCSS.AllAlbumPage__container}>
            <AlbumsBlock />            
        </div>
    )
}
  
  export default AllAlbumsPage
