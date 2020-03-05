import React, { useEffect, useState, useCallback } from "react"
import Service from "../../services/service-user"
import UserCard from "../../components/UserCard/UserCard"
import GetAllUsersCSS from "./GetAllUsers.module.css"
import Search from "../../components/Search/Search"
import Checkbox from "@material-ui/core/Checkbox"
import ServiceFriends from "../../services/service-friend"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { AllUsersAction } from "../../Redux/store/allUsers/allUsers.actions"
import  PaginationBlock  from "../../components/PaginationBlock/PaginationBlock"

type GetAllUsersProps = {
  user: User
  dispatch: any
}

const GetAllUsers: React.FunctionComponent<GetAllUsersProps> = ({
  user,
  dispatch
}) => {
  const [users, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const [valueSearchBox, setValueSearchBox]: any = useState("")
  const [timerId, setTimerId]: any = useState(undefined)
  const [checked, setChecked]: any = useState(false)

  const render = useCallback(async () => {
    try {
      await getLogInUserAllSubscriptionsAndObserver()
    } catch (e) {
      console.log(e)
    }
  }, [user])

  useEffect(() => {
    console.log(user)
    render()
  }, [render])

  async function getLogInUserAllSubscriptionsAndObserver() {
    if (user._id) {
      const arrayLogInUsersAllSubscriptionsAndObserver = await Service.getUserWithSubscriptionsById(
        user._id
      )
      setLoad("loaded")
      dispatch(AllUsersAction(arrayLogInUsersAllSubscriptionsAndObserver))
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
              users.map((userOwnerCard: any) => {
                return (
                  userOwnerCard._id !== user._id && (
                    <UserCard
                      key={userOwnerCard._id}
                      userOwnerCard={userOwnerCard}
                      removeHandler={removeHandler}
                      getLogInUserAllSubscriptionsAndObserver={
                        getLogInUserAllSubscriptionsAndObserver
                      }
                    />
                  )
                )
              })}
          </ul>
          <PaginationBlock/>
        </>
      )}      
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user
})

export default connect(mapStateToProps)(GetAllUsers)
