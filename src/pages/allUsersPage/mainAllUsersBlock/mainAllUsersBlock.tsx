import React, { useEffect, useState, useCallback } from "react"
import Service from "../../../services/service-user"
import UserCard from "../../../components/UserCard/UserCard"
import MainAllUsersBlockPageCSS from "./mainAllUsersBlock.module.css"
import Search from "../../../components/Search/Search"
import Checkbox from "@material-ui/core/Checkbox"
import { connect } from "react-redux"
import { User } from "../../../Redux/interfaces/user.interface"
import { AllUsersAction } from "../../../Redux/store/allUsers/allUsers.actions"
import PaginationBlock from "../../../components/PaginationBlock/PaginationBlock"
import { setValuesForPaginationAction } from "../../../Redux/store/pagination/pagination.actions"
import { getAllUsersForSagasAction } from "../../../Redux/store/allUsers/allUsers.actions"

type MainAllUsersBlockProps = {
  user: User
  dispatch: any
  allUsers: []
}

const MainAllUsersBlock: React.FunctionComponent<MainAllUsersBlockProps> = ({
  user,
  dispatch,
  allUsers
}) => {
  const [load, setLoad]: any = useState("loading")

  const render = useCallback(async () => {
    try {      
      if(user._id) {    
        console.log(user._id)  
      dispatch(getAllUsersForSagasAction(user._id))
      setLoad("loaded")
      } else {
        dispatch(getAllUsersForSagasAction(''))
      }
    } catch (e) {
      console.log(e)
    }
  }, [user._id, dispatch])

  useEffect(() => {    
    render()
  }, [render, user])

  const removeHandler = async (id: number) => {
    setLoad("loading")
    await Service.removeHandler(id)
    // await getLogInUserAllSubscriptionsAndObserver()
  }

  const getLogInUserAllSubscriptionsAndObserver = () => {}

  return (
    <>
    {load === "loading" && <h1>Ожидайте ответа</h1>}
    {load === "loaded" && (
    <ul className={MainAllUsersBlockPageCSS.container__all_users__cards}>
      {allUsers &&
        allUsers.length > 0 &&
        allUsers.map((userOwnerCard: any) => {
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
    </ul>)}
    {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  allUsers: state.allUsers.allUsers
})

export default connect(mapStateToProps)(MainAllUsersBlock)
