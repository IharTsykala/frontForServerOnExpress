import React from "react"
import Service from "../../services/service-user"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../../components/FormDataUsers/FormDataUsers"
import {
  UserFormViewModes,
  UserFormViewButtons
} from "../../shared/constants/user-from-view-mode.enum"
import GetLogUpPageCSS from "./GetLogUpPage.module.css"
import { connect } from "react-redux"
import { userLogIn } from "../../Redux/store/userLogin/userLogin.actions"
import { User } from "../../Redux/interfaces/user.interface"

type GetLogUpPageProps = {
  user: User
  dispatch: any
}

const GetLogUpPage: React.FC<GetLogUpPageProps> = ({ user, dispatch }) => {
  const history = useHistory()

  const logUpHandler = async (id: string, user: User) => {
    const data = await Service.getTokenForRegistration(id, user)
    localStorage.setItem("token", data.token)
    dispatch(userLogIn(data.user))
    history.push(`/user/allUsers`)
  }

  return (
    <>
      <h3 className={GetLogUpPageCSS.main__sign_up__header}>
        Make the best decision in your life
      </h3>
      <FormDataUsers
        submitHandler={logUpHandler}
        namePage={UserFormViewModes.SingUp}
        nameButton={UserFormViewButtons.SingUp}
      />
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user
})

export default connect(mapStateToProps)(GetLogUpPage)
