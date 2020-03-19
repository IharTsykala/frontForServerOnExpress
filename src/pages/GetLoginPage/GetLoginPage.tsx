import React from "react"
import Service from "../../services/service-user"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../../components/FormDataUsers/FormDataUsers"
import {
  UserFormViewModes,
  UserFormViewButtons
} from "../../shared/constants/user-from-view-mode.enum"
import GetLoginPageCSS from "./GetLoginPage.module.css"
import { connect } from "react-redux"
import { userLogIn } from "../../Redux/store/userLogin/userLogin.actions"
import { User } from "../../Redux/interfaces/user.interface"

type GetLoginPageProps = {
  user: User
  dispatch: any
}

const GetLoginPage: React.FC<GetLoginPageProps> = ({ dispatch, user }) => {
  const history = useHistory()

  const logInHandler = async (id: any, user: any) => {
    try {
      const data = await Service.getTokenForLogin(id, user)
      localStorage.setItem("token", data.token)
      dispatch(userLogIn(data.user))
      // if(data.user.role==='admin') history.push(`/admin/all`)
      history.push(`/user/allUsers`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <h3 className={GetLoginPageCSS.main__log_in__header}>Welcome Back</h3>
      {!user.login && (
        <>
          <FormDataUsers
            submitHandler={logInHandler}
            namePage={UserFormViewModes.LogIn}
            nameButton={UserFormViewButtons.LogIn}
          />
        </>
      )}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user
})

export default connect(mapStateToProps)(GetLoginPage)
