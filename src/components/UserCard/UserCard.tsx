import React from "react"
import UserCardCSS from "./UserCard.module.css"
import { useHistory } from "react-router-dom"

type UserCardProps = {
  user: any
  removeHandler: any
  admin: string
}

const UserCard: React.FC<UserCardProps> = ({ user, removeHandler, admin }) => {
  const history = useHistory()
  return (
    <div className={UserCardCSS.container__all_users__card_user}>
      {admin==='admin' && (
        <i
          className={`material-icons ${UserCardCSS.container__all_users__card_user__delete}`}
          onClick={e => removeHandler(e, user._id)}
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
      {/* {user.friends.length>0?<p>{user.friends.length}</p>:<p>'You dont have friends'</p>} */}
      <p className={UserCardCSS.all_users__card_user__friends}>
        {" "}
        It don't have friends
      </p>
      <p className={UserCardCSS.all_users__card_user__role}>{user.role}</p>
      <button
        className={`waves-effect waves-light btn ${UserCardCSS.all_users__card_user__button}`}
      >
        Subscribe
      </button>
    </div>
  )
}

export default UserCard
