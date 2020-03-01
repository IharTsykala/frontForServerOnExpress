import React from "react"
import UserInformationCSS from "./UserInformation.module.css"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { UserOwnerThisPageInterface } from "../../Redux/interfaces/userOwnerThisPage.interface"

type UserInformationProps = {
  user: User
  userOwnerThisPage: UserOwnerThisPageInterface
}

const UserInformation: React.FC<UserInformationProps> = ({
  user,
  userOwnerThisPage
}) => {
  return (
    <section className={UserInformationCSS.user_profile__user_information}>
      <div
        className={
          UserInformationCSS.user_profile__user_information__block_information
        }
      >
        <h4>User Information</h4>
        {userOwnerThisPage.login && (
          <div>
            <p>Login:</p>
            <p>{userOwnerThisPage.login}</p>
          </div>
        )}
        {userOwnerThisPage.firstName && (
          <div>
            <p>FirstName:</p>
            <p>{userOwnerThisPage.firstName}</p>
          </div>
        )}
        {userOwnerThisPage.lastName && (
          <div>
            <p>LastName:</p>
            <p>{userOwnerThisPage.lastName}</p>
          </div>
        )}
        {userOwnerThisPage.email && (
          <div>
            <p>Email:</p>
            <p>{userOwnerThisPage.email}</p>
          </div>
        )}
        {userOwnerThisPage.phone && (
          <div>
            <p>Phone:</p>
            <p>{userOwnerThisPage.phone}</p>
          </div>
        )}
      </div>
      {(user.role === "admin" || user._id === userOwnerThisPage._id) && (
        <div
          className={
            UserInformationCSS.user_profile__user_information__button_to_go_over_edit_user_information
          }
        >
          <Link to={`${userOwnerThisPage._id}/edit`}>
            <button>Edit user information</button>
          </Link>
        </div>
      )}
    </section>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  userOwnerThisPage: state.userOwnerThisPage.userOwnerThisPage
})

export default connect(mapStateToProps)(UserInformation)
