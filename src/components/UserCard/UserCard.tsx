import React, { useEffect } from "react"
import UserCardCSS from "./UserCard.module.css"
import { useHistory } from "react-router-dom"
import ServiceSubscriptions from "../../services/service-subscribe"
import ServiceFriends from "../../services/service-friend"
import Service from "../../services/service-user"
import { connect } from "react-redux"
import { User } from "../../Redux/entitiesInterface/user.interface"

type UserCardProps = {
  user: User,
  userOwnerCard: User,
  getLogInUserAllSubscriptionsAndObserver: any,
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  userOwnerCard,
  getLogInUserAllSubscriptionsAndObserver,
}) => {
  const history = useHistory()

  useEffect(() => {}, [user.subscriptions])

  const handlerClickSubscribe = async () => {
    await ServiceSubscriptions.addSubscribe(user._id, userOwnerCard._id)
    getLogInUserAllSubscriptionsAndObserver()
  }

  const handlerClickUnSubscribe = async () => {
    await ServiceSubscriptions.deleteSubscribe(user._id, userOwnerCard._id)
    getLogInUserAllSubscriptionsAndObserver()
  }

  const handlerClickAddFriend = async () => {
    await ServiceSubscriptions.deleteSubscribeAfterAddFriend(
      userOwnerCard._id,
      user._id
    )
    await ServiceFriends.addFriend(user._id, userOwnerCard._id)
    getLogInUserAllSubscriptionsAndObserver()
  }

  const handlerClickRemoveFriend = async () => {
    await ServiceFriends.removeFriend(user._id, userOwnerCard._id)
    getLogInUserAllSubscriptionsAndObserver()
  }

  const removeHandler = async (id: string) => {
    await Service.removeHandler(id)
    getLogInUserAllSubscriptionsAndObserver()
  }

  return (
    <div className={UserCardCSS.container__all_users__card_user}>
      {user.role === "admin" && (
        <i
          className={`material-icons ${UserCardCSS.container__all_users__card_user__delete}`}
          onClick={() => removeHandler(userOwnerCard._id)}
        >
          delete
        </i>
      )}
      {userOwnerCard.avatar ? (
        <img
          src={`http://localhost:8080/images/users/${userOwnerCard._id}/${userOwnerCard.avatar}`}
          alt="avatar"
          onClick={() => {
            history.push(`/user/profile/${userOwnerCard._id}`)
          }}
        />
      ) : (
        <img
          src="http://localhost:8080/images/pattern-avatar.jpg"
          alt="avatar"
          onClick={() => {
            history.push(`/user/profile/${userOwnerCard._id}`)
          }}
        />
      )}
      <h5
        className={UserCardCSS.all_users__card_user__login}
        onClick={() => {
          history.push(`/user/profile/${userOwnerCard._id}`)
        }}
      >
        {userOwnerCard.login}
      </h5>
      <p className={UserCardCSS.all_users__card_user__friends}>
        {" "}
        {userOwnerCard.subscriptions || "it's not your friend"}
      </p>
      <p className={UserCardCSS.all_users__card_user__role}>
        {userOwnerCard.role}
      </p>
      <button
        className={`waves-effect waves-light btn ${UserCardCSS.all_users__card_user__button}`}
        onClick={
          userOwnerCard.subscriptions === "subscriber"
            ? () => handlerClickUnSubscribe()
            : userOwnerCard.subscriptions === "observer"
            ? () => handlerClickAddFriend()
            : userOwnerCard.subscriptions === "friend"
            ? () => handlerClickRemoveFriend()
            : () => handlerClickSubscribe()
        }
      >
        {userOwnerCard.subscriptions === "subscriber" ? (
          <p>UnSubscribe</p>
        ) : userOwnerCard.subscriptions === "observer" ? (
          <p>Add friend</p>
        ) : userOwnerCard.subscriptions === "friend" ? (
          <p>Remove friend</p>
        ) : (
          <p>Subscribe</p>
        )}
      </button>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
})

export default connect(mapStateToProps)(UserCard)
