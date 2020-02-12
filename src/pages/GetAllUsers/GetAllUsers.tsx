import React, { useEffect, useState, useContext, useCallback } from "react"
import Service from "../../services/service-user"
import UserCard from "../../components/UserCard/UserCard"
import GetAllUsersCSS from "./GetAllUsers.module.css"
import { Context } from "../../Context"

export const GetAllUsers: React.FC = () => {
  const [users, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const { userID, userRole } = useContext(Context)

  const render = useCallback(() => {
    try {
      getUsers()
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    render()
  }, [render])

  async function getUsers() {
    const users = await Service.getAllUsers()
    setLoad("loaded")
    setUsers(users)
  }

  // const defineRoleUser = async () => {
  //   const user = await Service.getUserByID(userID)
  //   if (user.role === "admin") setAdmin(true)
  // }

  const removeHandler = async (e: any, id: number) => {
    setLoad("loading")
    await Service.removeHandler(id)
    getUsers()
  }

  return (
    <>
      {load === "loading" && <h1>Ожидайте ответа</h1>}
      {load === "loaded" && (
        <>
          <h2 className={GetAllUsersCSS.container__all_users__header}>
            Make friends
          </h2>
          <ul className={GetAllUsersCSS.container__all_users__cards}>
            {users.map((user: any) => {
              return (
                user._id !== userID && (
                  <UserCard
                    key={user._id}
                    user={user}
                    removeHandler={removeHandler}
                    admin={userRole}
                  />
                )
              )
            })}
          </ul>
        </>
      )}
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}

// const removeHandler = async (id: number)=> {    	  const removeHandler = async (id: number) => {
//   setLoad('loading')      	    setLoad("loading")
//   await Service.removeHandler(id)	    await Service.removeHandler(id)
//   // history.replace(`/users/all`)	    // history.replace(`/users/all`)
//   history.go(0)

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
