import React from "react"
import { Link } from "react-router-dom"
import FormDataUsers from "../../components/FormDataUsers/FormDataUsers"
import {
  UserFormViewModes,
  UserFormViewButtons
} from "../../shared/constants/user-from-view-mode.enum"
import { useHistory } from "react-router-dom"
import Service from "../../services/service-user"

export const UserEditInformation = (props: any) => {
  const idUserOwnerPage = props.match.params.id

  const history = useHistory()

  const submitHandler = async (id: number, user: any) => {
    await Service.editUser(id, user)
    history.push(`/user/${idUserOwnerPage}`)
  }

  return (
    <>
      <Link to={`/user/${idUserOwnerPage}`}>
        <p>BACK TO USER INFORMATION</p>
      </Link>
      <div>
        <FormDataUsers
          submitHandler={submitHandler}
          namePage={UserFormViewModes.Edit}
          nameButton={UserFormViewButtons.Edit}
        />
      </div>
    </>
  )
}
