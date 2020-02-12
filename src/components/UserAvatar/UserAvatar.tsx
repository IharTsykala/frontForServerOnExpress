import React from "react"

type UserAvatarProps = {
  user: any
  avatarForFront: any
  handleChangeAvatar: any
  handleSubmit: any
  userRole: string
  homePageStatus: any
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  avatarForFront,
  handleChangeAvatar,
  handleSubmit,
  userRole,
  homePageStatus
}) => {
  return (
    <form action="submit">
      {avatarForFront && (
        <img className="chelik" src={`${avatarForFront}`} alt="avatar" />
      )}
      {!avatarForFront && user._id && user.avatar && (
        <img
          className="chelik"
          src={`http://localhost:8080/images/users/${user._id}/${user.avatar}`}
          alt="avatar"
        />
      )}
      {!avatarForFront && user._id && !user.avatar && (
        <img
          className="chelik"
          src={`http://localhost:8080/images/pattern-avatar.jpg`}
          alt="avatar"
        />
      )}
      {(userRole === "admin" || homePageStatus) && (
        <>
          <input type="file" onChange={e => handleChangeAvatar(e)} />
          <input
            type="submit"
            value="Отправить"
            onClick={e => handleSubmit(e)}
          />
        </>
      )}
    </form>
  )
}
