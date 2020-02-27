import React, { useEffect, useState, useContext, useCallback } from "react"
import Service from "../../services/service-user"
import UserCard from "../../components/UserCard/UserCard"
import GetAllUsersCSS from "./GetAllUsers.module.css"
// import { Context } from "../../Context"
import Search from "../../components/Search/Search"
import Checkbox from "@material-ui/core/Checkbox"
import ServiceSubscriptions from "../../services/service-subscribe"
import ServiceFriends from "../../services/service-friend"
import GetLoginPageCSS from "./GetLoginPage.module.css"
import { connect } from 'react-redux'
import { userLogIn } from "../../Redux/store/user/user.actions"
import { User } from '../../Redux/interfaces/user.interface'

type GetAllUsersProps = {
  user: User
  dispatch: any  
}


const GetAllUsers: React.FunctionComponent<GetAllUsersProps> = ({ dispatch, user }) => {
  const [users, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  // const { userID, userRole } = useContext(Context)
  const [valueSearchBox, setValueSearchBox]: any = useState("")
  const [timerId, setTimerId]: any = useState(undefined)
  const [checked, setChecked]: any = useState(false)

  const render = useCallback(async () => {    try {      
      await getLogInUserAllSubscriptionsAndObserver()

    } catch (e) {
      console.log(e)
    }
  }, [user])

  useEffect(() => {
    console.log(user)
    render()
  }, [render])

  // async function getUsers() {
  //   const users = await Service.getAllUsers()
  //   setLoad("loaded")
  //   setUsers(users)
  // }

  async function getLogInUserAllSubscriptionsAndObserver() {
    if(user._id) {
      const arrayLogInUsersAllSubscriptionsAndObserver = await Service.getUserWithSubscriptionsById(
        user._id        
      )      
      setLoad("loaded")
      setUsers(arrayLogInUsersAllSubscriptionsAndObserver)
    }    
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
      } else if (valueSearchBox.length === 2)
        await getLogInUserAllSubscriptionsAndObserver()
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
    await getLogInUserAllSubscriptionsAndObserver()
  }

  const handleClickFriendCheckBox = async () => {
    if (!checked) {
      let arrayFriendsByIdUser = await ServiceFriends.getArrayFriendsByIdUser(
        user._id
      )
      console.log(arrayFriendsByIdUser)
      // arrayFriendsByIdUser = arrayFriendsByIdUser.map((friend: any) =>
      //   Object.assign({}, friend, { subscriptions: "friend" })
      // )
      setUsers(arrayFriendsByIdUser)
    } else {
      await getLogInUserAllSubscriptionsAndObserver()
    }
    setChecked(!checked)
  }

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
            {/* <p>{user}</p> */}
            <Checkbox
              checked={checked}
              onClick={() => handleClickFriendCheckBox()}
              className={
                GetAllUsersCSS.container__all_users__header__sort_checkbox
              }
            />
          </div>

          <ul className={GetAllUsersCSS.container__all_users__cards}>
            {users.length > 0 &&
              users.map((userCard: any) => {
                return (
                  userCard._id !== user._id && (
                    <UserCard
                      key={userCard._id}
                      user={userCard}
                      removeHandler={removeHandler}
                      // admin={userRole}
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

const mapStateToProps = (state: any) => ({
  user: state.common.user
})

export default connect(mapStateToProps)(GetAllUsers);









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
