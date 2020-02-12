import React from "react"
import PhotoCardCSS from "./PhotoCard.module.css"


type UserPhotoCard = {
name?: any
description?: any
id?:any
removeHandler?: any
editHandler?: any
url: any
idUser: any
}

const PhotoCard: React.FC<UserPhotoCard> = ({name, description, id, removeHandler, editHandler,url, idUser}) => {

  // useEffect(()=>{console.log(name)},[])
  
  return (
    <>
             {/* <p>{name}</p>
            <p>{description}</p>
            <i  className="material-icons" onClick={()=>editHandler(id)} > edit </i> */}
            <i  className="material-icons" onClick={()=>removeHandler(id)} > delete </i> 
            <img className={PhotoCardCSS.user_profile__card_container__img} src={`http://localhost:8080/images/users/${idUser}/${url}`} alt="photo"/>

    </>
  )
}

export default PhotoCard