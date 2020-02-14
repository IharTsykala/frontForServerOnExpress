import React from "react"
import PhotoCard from "../PhotoCard/PhotoCard"
import CreateListCSS from "./CreateList.module.css"

type CreateListProps = {
  arr: any
  removeHandler: any
  editHandler: any
  idUserOwnerPage?: any
  idChosenAlbum?:any
  // arrUrlForNewAlbum?: any
  createListFunction: any
}

const CreateList: React.FC<CreateListProps> = ({
  arr,
  removeHandler,
  editHandler,
  idUserOwnerPage,
  idChosenAlbum,
  createListFunction
  
}) => {  

  return (
    <ul className={CreateListCSS.user_profile__create_list__container}>
      {arr.length > 0 &&
        arr.map((item: any) => (
          <li
            className={CreateListCSS.user_profile__card_container}
            key={item._id}
          >           
            <PhotoCard          
              urlItem={createListFunction==='CreateListAlbums' && item.photos.length
              ?item.photos[0].url           
              :item.url}              
              idItem={item._id}
              removeHandler={removeHandler}
              editHandler={editHandler}              
              idUserOwnerPage={idUserOwnerPage}
              idChosenAlbum={idChosenAlbum}
              // createListFunction={createListFunction}
              // description={description}              
            />
          </li>
        ))}
      {!arr.length && <p>Your {createListFunction} is empty</p>}
    </ul>
  )
}

export default CreateList
