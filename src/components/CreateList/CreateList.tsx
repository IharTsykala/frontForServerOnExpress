import React from "react"
import PhotoCard from "../PhotoCard/PhotoCard"
import CreateListCSS from "./CreateList.module.css"

type CreateListProps = {
  arr: any  
  removeHandler: any
  editHandler?: any
  idUser: any
}

const CreateList: React.FC<CreateListProps> = ({arr, removeHandler, editHandler, idUser}) => {  
  // console.log(arr)
  // useEffect(()=>{})  
  
  return (
    <ul className={CreateListCSS.user_profile__create_list__container}>
      {arr.length > 0 &&
        arr.map((arr: any) => (
          <li className={CreateListCSS.user_profile__card_container} key={arr._id}>
             {/* <PhotoCard name={arr.name} description={arr.description} id={arr._id} removeHandler={removeHandler} editHandler={editHandler} /> */}
            < PhotoCard url={arr.url} id={arr._id} removeHandler={removeHandler} idUser={idUser} />
          </li>
        ))}
      {!arr.length && <p>Your list is empty</p>}
    </ul>
  )
}

export default CreateList
