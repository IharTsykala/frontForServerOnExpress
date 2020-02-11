import React from "react"
// import PhotoCardCSS from "./PhotoCard.module.css"


type UserPhotoCard = {
name: any
description: any
id:any
removeHandler: any
editHandler: any
}

const PhotoCard: React.FC<UserPhotoCard> = ({name, description, id, removeHandler, editHandler}) => {

  // useEffect(()=>{console.log(name)},[])
  
  return (
    <>
            <p>{name}</p>
            <p>{description}</p>
            <i  className="material-icons" onClick={()=>editHandler(id)} > edit </i>
            <i  className="material-icons" onClick={()=>removeHandler(id)} > delete </i>

    </>
  )
}

export default PhotoCard