import React from "react"
import UserInformationCSS from "./UserInformation.module.css"
import { Link } from "react-router-dom"

type UserInformationProps = {
  userOwnerPage: any
}

const UserInformation: React.FC<UserInformationProps> = ({ userOwnerPage }) => {
  return (
    <section className={UserInformationCSS.user_profile__user_information}>
      <div
        className={
          UserInformationCSS.user_profile__user_information__block_information
        }
      >
        <h4>User Information</h4>
        {userOwnerPage.login && (
          <div>
            <p>Login:</p>
            <p>{userOwnerPage.login}</p>
          </div>
        )}
        {userOwnerPage.firstName && (
          <div>
            <p>FirstName:</p>
            <p>{userOwnerPage.firstName}</p>
          </div>
        )}
        {userOwnerPage.lastName && (
          <div>
            <p>LastName:</p>
            <p>{userOwnerPage.lastName}</p>
          </div>
        )}
        {userOwnerPage.email && (
          <div>
            <p>Email:</p>
            <p>{userOwnerPage.email}</p>
          </div>
        )}
        {userOwnerPage.phone && (
          <div>
            <p>Phone:</p>
            <p>{userOwnerPage.phone}</p>
          </div>
        )}
      </div>
      <div
        className={
          UserInformationCSS.user_profile__user_information__button_to_go_over_edit_user_information
        }
      >
        <Link to={`${userOwnerPage._id}/edit`}>
          <button>Edit user information</button>
        </Link>
      </div>
    </section>
  )
}

export default UserInformation
