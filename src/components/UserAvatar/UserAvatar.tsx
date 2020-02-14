import React from "react"
import Button from "@material-ui/core/Button"
import UserAvatarCSS from "./UserAvatar.module.css"

type UserAvatarProps = {
  userOwnerPage: any
  avatarForFront: any
  handleChangeAvatar: any
  handleSubmit: any
  userRole: string
  homePageStatus: any
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  userOwnerPage,
  avatarForFront,
  handleChangeAvatar,
  handleSubmit,
  userRole,
  homePageStatus
}) => {
  return (
    <form
      action="submit"
      className={UserAvatarCSS.profile__change_avatar__form}
    >
      {avatarForFront && (
        <img className="chelik" src={`${avatarForFront}`} alt="avatar" />
      )}
      {!avatarForFront && userOwnerPage._id && userOwnerPage.avatar && (
        <img
          className="chelik"
          src={`http://localhost:8080/images/users/${userOwnerPage._id}/${userOwnerPage.avatar}`}
          alt="avatar"
        />
      )}
      {!avatarForFront && userOwnerPage._id && !userOwnerPage.avatar && (
        <img
          className="chelik"
          src={`http://localhost:8080/images/pattern-avatar.jpg`}
          alt="avatar"
        />
      )}
      {(userRole === "admin" || homePageStatus) && (
        <>
          <label
            htmlFor="avatarChange"
            className={UserAvatarCSS.profile__change_avatar__form__label}
          >
            {" "}
            Choose avatar
            <input
              id="avatarChange"
              type="file"
              onChange={e => handleChangeAvatar(e)}
            />
          </label>
          <Button size="small" color="primary" onClick={e => handleSubmit(e)}>
            Change Avatar
          </Button>
        </>
      )}
    </form>
  )
}
