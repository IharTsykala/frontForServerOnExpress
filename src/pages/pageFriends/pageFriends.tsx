import React, { useEffect } from "react"
import UserCard from "../../components/UserCard/UserCard"
import PageFriendsCSS from "./pageFriends.module.css"
import { connect } from "react-redux"
import { User } from "../../Redux/entitiesInterface/user.interface"
import { getAllFriendsByUserId } from "../../Redux/store/user/user.actions"

type PageFriendsProps = {
  user: User
  dispatch: any
  allFriends: [User]
  match: any
}

const PageFriends: React.FunctionComponent<PageFriendsProps> = ({
  user,
  dispatch,
  allFriends,
  match
}) => {
  const idUserOwnerPage = match.params.id
  useEffect(() => {
    dispatch(getAllFriendsByUserId(idUserOwnerPage))
  }, [dispatch, idUserOwnerPage])

  const getLogInUserAllSubscriptionsAndObserver = () => {
    dispatch(getAllFriendsByUserId(idUserOwnerPage))
  }

  return (
    <>
      {/* {load === "loading" && <h1>Ожидайте ответа</h1>}
      {load === "loaded" && */}

      <ul className={PageFriendsCSS.container__all_users__cards}>
        {allFriends &&
          allFriends.length > 0 &&
          allFriends.map((userOwnerCard: any) => {
            return (
              userOwnerCard._id !== idUserOwnerPage && (
                <UserCard
                  key={userOwnerCard._id || 1}
                  userOwnerCard={userOwnerCard}
                  getLogInUserAllSubscriptionsAndObserver={
                    getLogInUserAllSubscriptionsAndObserver
                  }
                />
              )
            )
          })}
      </ul>
      {/* {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>} */}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  allFriends: state.user.allUsers
})

export default connect(mapStateToProps)(PageFriends)
