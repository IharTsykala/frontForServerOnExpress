import React, { useEffect, useState, useContext, useCallback } from "react"
import Service from "../../services/service-user"
import ServiceSubscriptions from "../../services/service-subscribe"
import UserCard from "../../components/UserCard/UserCard"
import GetAllUsersCSS from "./GetAllUsers.module.css"
import { Context } from "../../Context"
import Search from "../../components/Search/Search"
import ServiceFriends from "../../services/service-friend"

export const GetAllUsers: React.FC = () => {
  const [users, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const { userID, userRole } = useContext(Context)
  const [valueSearchBox, setValueSearchBox]: any = useState("")
  const [arrayLogInUserSubscriptions, setArrayLogInUserSubscriptions]: any = useState(
    []
  )
  // const [arrayLogInUserObservers, setArrayLogInUserObservers]: any = useState(
  //   []
  // )
  const [arrayLogInUserAllFriends, setArrayLogInUserAllFriends]: any = useState(
    []
  )
  const [timerId, setTimerId]: any = useState(undefined)
  const [usersInfo, setUserInfo]: any = useState("")

  const render = useCallback(() => {
    try {
      getUsers()
      getLogInUserAllSubscriptionsAndObserver()
      getLogInUserAllFriends()      
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

  const createArrayUsersInfo = () => {
    console.log(arrayLogInUserSubscriptions)
    let usersInfo: any = []
    users.forEach((user: any) => {
      let flagSubscribe = false
      let flagObserver = false
      arrayLogInUserSubscriptions.forEach((subscribe: any) => {
        if (user._id === subscribe.responseSubscriberId) {
          usersInfo = usersInfo.concat(
            (user = Object.assign(user, { subscribe: "subscribe" }))
          )
          flagSubscribe = true
        }

        if (user._id === subscribe.requestSubscriberId) {
          usersInfo = usersInfo.concat(
            (user = Object.assign(user, { subscribe: "observer" }))
          )
          flagSubscribe = true
        }
      })

      if (!flagSubscribe && !flagObserver) usersInfo = usersInfo.concat(user)
    })
    // users.forEach((user: any) => {
    //   let count = 0
    //   arrayLogInUserSubscribes.forEach((subscribe: any) => {
    //     if (user._id === subscribe.requestSubscriberId) {
    //       usersInfo = usersInfo.concat(
    //         (user = Object.assign(user, { subscribe: "observers" }))
    //       )
    //       count = count + 1
    //     }
    //   })
    //   if (!count) usersInfo = usersInfo.concat(user)
    // })
    //  users.map((user:any)=>{
    //   arrayLogInUserSubscribes.map((subscribe:any)=>{
    //      if(user._id === subscribe.requestSubscriberId) {
    //      user = Object.assign(user, {subscribe: 'observer'})
    //      }
    //    })
    //  })
    setUsers(usersInfo)
    // console.log(usersInfo)
    // setUserInfo(setInfo)
    // setUsers(usersInfo)
  }

  useEffect(() => {
    createArrayUsersInfo()
  }, [arrayLogInUserSubscriptions.length])

  async function getLogInUserAllSubscriptionsAndObserver() {
    const arrayLogInUserSubscriptions = await ServiceSubscriptions.getAllSubscribes(
      userID
    )
    setArrayLogInUserSubscriptions(arrayLogInUserSubscriptions)       
  }

  async function getLogInUserAllFriends() {
    const arrayLogInUserAllFriends = await ServiceFriends.getLogInUserAllFriends(
      userID
    )
    setArrayLogInUserAllFriends(arrayLogInUserAllFriends)
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
      } else if (valueSearchBox.length === 2) getUsers()
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

  // const handlerClickSubscribe = async(IdObserversUser:any) => {
  //   await ServiceSubscriptions.addSubscribe(userID, IdObserversUser)
  //   getLogInUserSubscribes()
  //   getLogInUserObservables()
  // }

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
                      idUserOwnerCard={user._id}
                      arrayLogInUserSubscriptions={arrayLogInUserSubscriptions}
                      // arrayLogInUserObservables={arrayLogInUserObservables}
                      // getLogInUserRequestSubscribes={getLogInUserRequestSubscribes}
                      // getLogInUserResponseSubscribes={getLogInUserResponseSubscribes}
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
