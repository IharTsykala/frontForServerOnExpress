import React from "react"
import PhotoCard from "../PhotoCard/PhotoCard"
import CreateListCSS from "./CreateList.module.css"

type CreateListProps = {
  arr: any
  removeHandler: any
  editHandler?: any
  idUser: any
  // arrUrlForNewAlbum?: any
}

const CreateList: React.FC<CreateListProps> = ({
  arr,
  removeHandler,
  editHandler,
  idUser
  // arrUrlForNewAlbum
}) => {
  // console.log(arr)
  // useEffect(()=>{})

  return (
    <ul className={CreateListCSS.user_profile__create_list__container}>
      {arr.length > 0 &&
        arr.map((item: any) => (
          <li
            className={CreateListCSS.user_profile__card_container}
            key={item._id}
          >
            {/* <PhotoCard name={arr.name} description={arr.description} id={arr._id} removeHandler={removeHandler} editHandler={editHandler} /> */}
            <PhotoCard
              // url={arr.url}
              id={item._id}
              removeHandler={removeHandler}
              idUser={idUser}
              avatar={item.avatar}
              // arrUrlForNewAlbum={arrUrlForNewAlbum}
            />
          </li>
        ))}
      {!arr.length && <p>Your list is empty</p>}
    </ul>
  )
}

export default CreateList
