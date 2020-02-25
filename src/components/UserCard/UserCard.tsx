import React, { useEffect, useContext } from "react"
import UserCardCSS from "./UserCard.module.css"
import { useHistory } from "react-router-dom"
import ServiceSubscriptions from "../../services/service-subscribe"
import ServiceFriends from "../../services/service-friend"
import { Context } from "../../Context"

type UserCardProps = {
  user: any
  removeHandler: any
  admin: string
  getLogInUserAllSubscriptionsAndObserver: any
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  removeHandler,
  admin,
  getLogInUserAllSubscriptionsAndObserver
}) => {
  const history = useHistory()
  const { userID } = useContext(Context) 

  useEffect(() => {  
  }, [user.subscriptions])

  const handlerClickSubscribe = async () => {
    await ServiceSubscriptions.addSubscribe(userID, user._id)
    await getLogInUserAllSubscriptionsAndObserver()
  }

  const handlerClickUnSubscribe = async () => {
    await ServiceSubscriptions.deleteSubscribe(userID, user._id)
    await getLogInUserAllSubscriptionsAndObserver()
  }

  const handlerClickAddFriend = async () => {
    await ServiceSubscriptions.deleteSubscribeAfterAddFriend(user._id, userID)
    await ServiceFriends.addFriend(userID, user._id)    
    await getLogInUserAllSubscriptionsAndObserver()
  }

  const handlerClickRemoveFriend = async() => {
    await ServiceFriends.removeFriend(userID, user._id)
    await getLogInUserAllSubscriptionsAndObserver()
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
        {user.subscriptions || "it's not your friend"}
      </p>
      <p className={UserCardCSS.all_users__card_user__role}>{user.role}</p>
      <button
        className={`waves-effect waves-light btn ${UserCardCSS.all_users__card_user__button}`}
        onClick={
          user.subscriptions === "subscriber"
            ? () => handlerClickUnSubscribe()
            : user.subscriptions === "observer"
            ? () => handlerClickAddFriend()
            : user.subscriptions === "friend"
            ? () => handlerClickRemoveFriend()
            : () => handlerClickSubscribe()
        }
      >
        {user.subscriptions === "subscriber" ? (
          <p>UnSubscribe</p>
        ) : user.subscriptions === "observer" ? (
          <p>Add friend</p>
        ) : user.subscriptions === "friend" ? (
          <p>Remove friend</p>
        ) : (
          <p>Subscribe</p>
        )}
      </button>
    </div>
  )
}

export default UserCard

// const [isSubscribe, setIsSubscribe] = useState(false)
// const [isObservable, setIsObservable] = useState(false)
// const [isFriend, setIsFriend] = useState(false)
// const [isEmpty, setIsEmpty] = useState(true)

// const getSubscribeStatus = () => {
//   console.log(isSubscribe, isObservable, isFriend)
//   switch (user.subscribe) {
//     case "subscriber":
//       setIsSubscribe(true)
//       break
//     case "observer":
//       setIsObservable(true)
//       break
//     case "friend":
//       setIsFriend(true)
//       break
//     default:
//   }
//   console.log(isSubscribe, isObservable, isFriend)
// }

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

// const turnOffThisState = () => {
//   if (isSubscribe) setIsSubscribe(false)
//   else if (isObservable) setIsObservable(false)
//   else if (isFriend) setIsFriend(false)
//   console.log(isSubscribe, isObservable, isFriend)
// }
