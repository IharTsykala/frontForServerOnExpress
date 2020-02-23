import React, { useEffect, useState, useContext } from "react"
import UserCardCSS from "./UserCard.module.css"
import { useHistory } from "react-router-dom"
import ServiceSubscriptions from "../../services/service-subscribe"
import ServiceFriends from "../../services/service-friend"
import { Context } from "../../Context"

type UserCardProps = {
  user: any
  removeHandler: any
  admin: string
  // idUserOwnerCard: any
  // arrayLogInUserSubscriptions: any
  // userSubscribeStatus: any
  createArrayUsersInfo: any
  getLogInUserAllSubscriptionsAndObserver: any
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  removeHandler,
  admin,
  // idUserOwnerCard,
  // arrayLogInUserSubscriptions,
  // userSubscribeStatus,
  createArrayUsersInfo,
  getLogInUserAllSubscriptionsAndObserver
}) => {
  const history = useHistory()
  const [isSubscribe, setIsSubscribe] = useState(false)
  const [isObservable, setIsObservable] = useState(false)
  const [isFriend, setIsFriend] = useState(false)
  // const [isEmpty, setIsEmpty] = useState(true)
  const { userID } = useContext(Context)

  const getSubscribeStatus = () => {
    console.log(isSubscribe, isObservable, isFriend)
    switch (user.subscribe) {
      case "subscribe":
        setIsSubscribe(true)
        break
      case "observer":
        setIsObservable(true)
        break
      case "friend":
        setIsFriend(true)
        break
      default:
    }
    console.log(isSubscribe, isObservable, isFriend)
  }

  useEffect(() => {
    getSubscribeStatus()
    createArrayUsersInfo()
  }, [user.subscribe])

  // const handlerClickSubscribeOrUnsubscribe = async(IdObserversUser:any) => {
  //   await ServiceSubscriptions.addSubscribe(userID, IdObserversUser)
  //   getLogInUserSubscribes()
  //   getLogInUserObservables()
  // }

  // const handlerClickAddFriendsOrRemove = async(IdObserversUser:any) => {
  //   await ServiceSubscriptions.addSubscribe(userID, IdObserversUser)
  //   getLogInUserSubscribes()
  //   getLogInUserObservables()
  // }

  const turnOffThisState = () => {
    if (isSubscribe) setIsSubscribe(false)
    else if (isObservable) setIsObservable(false)
    else if (isFriend) setIsFriend(false)
    console.log(isSubscribe, isObservable, isFriend)
  }

  const handlerClickSubscribe = async () => {
    await ServiceSubscriptions.addSubscribe(userID, user._id)
    turnOffThisState()
    await getLogInUserAllSubscriptionsAndObserver()
    // createArrayUsersInfo()
    // getLogInUserRequestSubscribes()
    // getLogInUserResponseSubscribes()
  }

  const handlerClickUnSubscribe = () => {
    turnOffThisState()
  }

  const handlerClickAddFriend = async () => {
    turnOffThisState()
    await ServiceFriends.addFriend(userID, user._id)
  }

  const handlerClickRemoveFriend = () => {
    turnOffThisState()
  }

  return (
    <div className={UserCardCSS.container__all_users__card_user}>
      {admin === "admin" && (
        <i
          className={`material-icons ${UserCardCSS.container__all_users__card_user__delete}`}
          onClick={() => removeHandler(user._id)}
        >
          delete
        </i>
      )}
      {user.avatar ? (
        <img
          src={`http://localhost:8080/images/users/${user._id}/${user.avatar}`}
          alt="avatar"
          onClick={() => {
            history.push(`/user/${user._id}`)
          }}
        />
      ) : (
        <img
          src="http://localhost:8080/images/pattern-avatar.jpg"
          alt="avatar"
          onClick={() => {
            history.push(`/user/${user._id}`)
          }}
        />
      )}
      <h5
        className={UserCardCSS.all_users__card_user__login}
        onClick={() => {
          history.push(`/user/${user._id}`)
        }}
      >
        {user.login}
      </h5>
      <p className={UserCardCSS.all_users__card_user__friends}>
        {" "}
        {user.subscribe || "it's not your friend"}
      </p>
      <p className={UserCardCSS.all_users__card_user__role}>{user.role}</p>
      <button
        className={`waves-effect waves-light btn ${UserCardCSS.all_users__card_user__button}`}
        onClick={
          isSubscribe && !isObservable && !isFriend
            ? () => handlerClickUnSubscribe()
            : isSubscribe && !isObservable && !isFriend
            ? () => handlerClickAddFriend()
            : !isSubscribe && isObservable && !isFriend
            ? () => handlerClickRemoveFriend()
            : () => handlerClickSubscribe()
        }
      >
        {!isSubscribe && !isObservable && !isFriend ? (
          <p>Subscribe</p>
        ) : isSubscribe && !isObservable && !isFriend ? (
          <p>UnSubscribe</p>
        ) : !isSubscribe && isObservable && !isFriend ? (
          <p>Add friend</p>
        ) : !isSubscribe && !isObservable && isFriend ? (
          <p>Remove friend</p>
        ) : null}
      </button>
    </div>
  )
}

export default UserCard
