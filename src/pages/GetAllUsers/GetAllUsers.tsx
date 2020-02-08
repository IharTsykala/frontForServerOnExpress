import React, { useEffect, useState } from "react"
import Service from "../../services/service-user"
import UserCard from "../../components/UserCard/UserCard"
import GetAllUsersCSS from "./GetAllUsers.module.css"

export const GetAllUsers: React.FC = () => {
  const [users, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const [cardClick, setCardClick]: any = useState("")
  console.log(cardClick)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const users = await Service.getAllUsers()
    setLoad("loaded")
    setUsers(users)
  }

  return (
    <>
      {load === "loading" && <h1>Ожидайте ответа</h1>}
      {load === "loaded" && (
        <>
          <h2 className={GetAllUsersCSS.container__all_users__header}>
            Find friends for youself
          </h2>
          <ul className={GetAllUsersCSS.container__all_users__cards}>
            {users.map((user: any) => (
              <UserCard key={user._id} user={user} />
            ))}
          </ul>
        </>
      )}
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}

// import UserInfo from '../../components/UserInfo/UserInfo'

// import { useHistory } from "react-router-dom"

// const history = useHistory()
// const [pets, setPets]: any = useState("")
// const [userIdForPets, setUserIdForPets]: any = useState("")
// console.log(GetAllUsersCSS)

// <li key={user._id}>
//   <p>{user.login}</p>
//   {<> {pets.length && getCodeForPets(user)} </>}
//   <i
//     className="material-icons blue-text edit"
//     onClick={event => getPetsHandler(user._id)}
//   >
//     pets
//   </i>
//   <i
//     className="material-icons blue-text edit"
//     onClick={event => editHandler(user._id)}
//   >
//     edit
//   </i>
//   <i
//     className="material-icons red-text"
//     onClick={event => removeHandler(user._id)}
//   >
//     delete
//   </i>
// </li>

// const getCodeForPets = (user: any) => {
//   return (
//     <>
//       <ul>
//         {userIdForPets === user._id &&
//           pets.map((pet: any) => (
//             <li key={pet._id}>
//               <p>{`${pet.name} ${pet.species}`}</p>
//             </li>
//           ))}
//       </ul>
//     </>
//   )
// }

// {cardClick?<UserInfo user={cardClick}/>:<h2>Find friends for youself</h2>}
