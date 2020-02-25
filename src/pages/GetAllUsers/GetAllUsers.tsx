import React, { useEffect, useState, useContext, useCallback } from "react"
import Service from "../../services/service-user"
import UserCard from "../../components/UserCard/UserCard"
import GetAllUsersCSS from "./GetAllUsers.module.css"
import { Context } from "../../Context"
import Search from "../../components/Search/Search"
import Checkbox from '@material-ui/core/Checkbox'
import ServiceSubscriptions from "../../services/service-subscribe"
import ServiceFriends from "../../services/service-friend"

export const GetAllUsers: React.FC = () => {
  const [users, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const { userID, userRole } = useContext(Context)
  const [valueSearchBox, setValueSearchBox]: any = useState("")
  const [timerId, setTimerId]: any = useState(undefined)
  const [checked, setChecked]:any = useState(true);

  const render = useCallback(async () => {
    try {
      // await getUsers()
      await getLogInUserAllSubscriptionsAndObserver()

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

  async function getLogInUserAllSubscriptionsAndObserver() {
    const arrayLogInUsersAllSubscriptionsAndObserver = await Service.getUserWithSubscriptionsById(
      userID
    )    
    setLoad("loaded")
    setUsers(arrayLogInUsersAllSubscriptionsAndObserver)
  }

  const handlerInputSearchBox = (e: any) => {
    clearTimeout(timerId)
    setValueSearchBox(e.target.value)
  }

  const getFlirtedArrayUsers = useCallback(async (valueSearchBox: any) => {
    try {
      if (valueSearchBox.length > 2) {
        const clearInterval = setTimeout(async () => {
          const arrayFilteredUsers = await Service.getFilteredUsers(
            valueSearchBox
          )
          setUsers(arrayFilteredUsers)
        }, 1000)
        setTimerId(clearInterval)
      } else if (valueSearchBox.length === 2) await getLogInUserAllSubscriptionsAndObserver()
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    getFlirtedArrayUsers(valueSearchBox)
  }, [getFlirtedArrayUsers, valueSearchBox])

  const removeHandler = async (id: number) => {
    setLoad("loading")
    await Service.removeHandler(id)
    getUsers()
  }

  const handleClickFriendCheckBox = async () => {
    if(!checked) {
      let arrayFriendsByIdUser = await ServiceFriends.getArrayFriendsByIdUser(userID)
      arrayFriendsByIdUser = arrayFriendsByIdUser.map((friend:any)=>Object.assign({}, friend, { subscriptions: "friend" }))      
      setUsers(arrayFriendsByIdUser)      
    } else {
      await getLogInUserAllSubscriptionsAndObserver()
    } 
    setChecked(!checked);    
  };
  

  return (
    <>
      {load === "loading" && <h1>Ожидайте ответа</h1>}
      {load === "loaded" && (
        <>
          <div className={GetAllUsersCSS.container__all_users__header}>
            <Search
              handlerInputSearchBox={handlerInputSearchBox}
              valueSearchBox={valueSearchBox}
            />
            <h2>Make friends</h2>            
            <Checkbox
              checked={checked}
              onClick={()=>handleClickFriendCheckBox()}
              value="friends"
              inputProps={{ 'aria-label': 'friends checkbox' }}
            />
          </div>

          <ul className={GetAllUsersCSS.container__all_users__cards}>
            {users.length > 0 &&
              users.map((user: any) => {
                return (
                  user._id !== userID && (
                    <UserCard
                      key={user._id}
                      user={user}
                      removeHandler={removeHandler}
                      admin={userRole}
                      getLogInUserAllSubscriptionsAndObserver={
                        getLogInUserAllSubscriptionsAndObserver
                      }
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

// / const createArrayUsersInfo = () => {
//   let usersInfo: any = []
//   users.forEach((user: any) => {
//     let flagSubscribe = false
//     let flagObserver = false
//     arrayLogInUserSubscriptions.forEach((subscribe: any) => {
//       if (user._id === subscribe.responseSubscriberId) {
//         usersInfo = usersInfo.concat(
//           (user = Object.assign(user, { subscribe: "subscribe" }))
//         )
//         flagSubscribe = true
//       }

//       if (user._id === subscribe.requestSubscriberId) {
//         usersInfo = usersInfo.concat(
//           (user = Object.assign(user, { subscribe: "observer" }))
//         )
//         flagSubscribe = true
//       }
//     })

//     if (!flagSubscribe && !flagObserver) usersInfo = usersInfo.concat(user)
//   })
//   setUserInfo(usersInfo)
// }

// useEffect(() => {
//   arrayLogInUsersAllSubscriptionsAndObserver()
// }, [arrayLogInUsersAllSubscriptionsAndObserver.length])
