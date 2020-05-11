import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../../components/FormDataUsers/FormDataUsers"
import {
  UserFormViewModes,
  UserFormViewButtons,
} from "../../shared/constants/user-from-view-mode.enum"
import GetLogUpPageCSS from "./GetLogUpPage.module.css"
import { connect } from "react-redux"
import { User } from "../../Redux/entitiesInterface/user.interface"
import { getUserSignUp } from "../../Redux/store/user/user.actions"
import { Typography } from "@material-ui/core"

type GetLogUpPageProps = {
  user: User,
  dispatch: any,
}

const GetLogUpPage: React.FC<GetLogUpPageProps> = ({ user, dispatch }) => {
  const history = useHistory()

  useEffect(() => {
    if (user._id) history.push(`/user/allUsers`)
  }, [history, user])

  const logUpHandler = async (id: string, user: {}) =>
    dispatch(getUserSignUp(id, user))

  return (
    <>
      <Typography
        variant="h4"
        className={GetLogUpPageCSS.main__sign_up__header}
      >
        Make the best decision in your life
      </Typography>
      <FormDataUsers
        submitHandler={logUpHandler}
        namePage={UserFormViewModes.SingUp}
        nameButton={UserFormViewButtons.SingUp}
      />
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
})

export default connect(mapStateToProps)(GetLogUpPage)
