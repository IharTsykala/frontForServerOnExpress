import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../../components/FormDataUsers/FormDataUsers"
import {
  UserFormViewModes,
  UserFormViewButtons,
} from "../../shared/constants/user-from-view-mode.enum"
import GetLoginPageCSS from "./GetLoginPage.module.css"
import { connect } from "react-redux"
import { User } from "../../Redux/entitiesInterface/user.interface"
import { getUserLogin } from "../../Redux/store/user/user.actions"
import { Typography } from "@material-ui/core"
import FormDataUsersCSS from "../../components/FormDataUsers/FormDataUsers.module.css"

type GetLoginPageProps = {
  user: User,
  dispatch: any,
}

const GetLoginPage: React.FC<GetLoginPageProps> = ({ dispatch, user }) => {
  const history = useHistory()

  useEffect(() => {
    if (user._id) history.push(`/user/allUsers`)
  }, [history, user])

  const logInHandler = (id: string, user: {}) =>
    dispatch(getUserLogin(id, user))

  return (
    <>
      <Typography variant="h6" className={GetLoginPageCSS.main__log_in__header}>
        Welcome Back
      </Typography>
      {!user.login && (
        <FormDataUsers
          submitHandler={logInHandler}
          namePage={UserFormViewModes.LogIn}
          nameButton={UserFormViewButtons.LogIn}
        />
      )}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
})

export default connect(mapStateToProps)(GetLoginPage)
