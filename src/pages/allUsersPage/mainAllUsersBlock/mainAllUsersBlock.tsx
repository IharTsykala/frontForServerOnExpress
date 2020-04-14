import React, { useEffect, useState } from "react"
import UserCard from "../../../components/UserCard/UserCard"
import MainAllUsersBlockPageCSS from "./mainAllUsersBlock.module.css"
import { connect } from "react-redux"
import { User } from "../../../Redux/entitiesInterface/user.interface"
import { getAllUsers } from "../../../Redux/store/user/user.actions"

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

  useEffect(() => {
    if (allUsers) {
      setLoad("loaded")
    } else {
      // This need make notFound
    }
  },[allUsers])

  const getLogInUserAllSubscriptionsAndObserver = () => {
    dispatch(getAllUsers(user._id))
  }

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
                    key={userOwnerCard._id||1}
                    userOwnerCard={userOwnerCard}
                    getLogInUserAllSubscriptionsAndObserver={
                      getLogInUserAllSubscriptionsAndObserver
                    }
                  />
                )
              )
            })}
        </ul>
      )}
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  allUsers: state.user.allUsers
})

export default connect(mapStateToProps)(MainAllUsersBlock)
