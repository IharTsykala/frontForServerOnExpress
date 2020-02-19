import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import FormDataUsers from "../../components/FormDataUsers/FormDataUsers"
import {
  UserFormViewModes,
  UserFormViewButtons
} from "../../shared/constants/user-from-view-mode.enum"
import { useHistory } from "react-router-dom"
import Service from "../../services/service-user"
import { Context } from "../../Context"

export const UserEditInformation = (props: any) => {
  const idUserOwnerPage = props.match.params.id
  const [userOwnerPage, setUserOwnerPage]: any = useState(null)
  const [homePageStatus, setHomePageStatus]: any = useState(false)
  const history = useHistory()
  const { userRole } = useContext(Context)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const userOwnerPage = await Service.getUserByID(idUserOwnerPage)
    setUserOwnerPage(userOwnerPage)
  }

  const submitHandler = async (id: number, user: any) => {
    await Service.editUser(id, user)
    // setUserLogin(user.login)
    history.push(`/user/${idUserOwnerPage}`)
  }

  return (
    <>
      <Link to={`/user/${idUserOwnerPage}`}>
        <p>BACK TO USER INFORMATION</p>
      </Link>
      <div>
        <FormDataUsers
          userOwnerPage={userOwnerPage}
          submitHandler={submitHandler}
          namePage={UserFormViewModes.Edit}
          nameButton={UserFormViewButtons.Edit}
          userRole={userRole}
          homePageStatus={homePageStatus}
        />
      </div>
    </>
  )
}
