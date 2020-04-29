import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { connect } from "react-redux"
import { User } from "../../Redux/entitiesInterface/user.interface"
import FormDataUsersRender from "./FormDataUsersRender/FormDataUsersRender"
import {
  UserFormViewButtons,
  UserFormViewModes,
} from "../../shared/constants/user-from-view-mode.enum"

type FormDataUsersProps = {
  user: User,
  userOwnerThisPage: User,
  submitHandler: any,
  namePage: UserFormViewModes,
  nameButton: UserFormViewButtons,
}

const FormDataUsers: React.FC<FormDataUsersProps> = ({
  user,
  userOwnerThisPage,
  submitHandler,
  namePage,
  nameButton,
}) => {
  return (
    <Formik
      initialValues={{
        login: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: userOwnerThisPage ? userOwnerThisPage.role : "user",
      }}
      validationSchema={Yup.object({
        login: Yup.string().max(15, "Must be 15 characters or less"),
        // .required("You need fill this field"),
        firstName: Yup.string().max(10, "Must be 10 characters or less"),
        lastName: Yup.string().max(10, "Must be 10 characters or less"),
        email: Yup.string().email("Invalid email address"),
        // phone: Yup.string().phone<string>("Invalid email address")
      })}
      onSubmit={(values: {}) => {
        submitHandler(user ? user._id : undefined, values)
      }}
    >
      <FormDataUsersRender
        user={user}
        userOwnerThisPage={userOwnerThisPage}
        namePage={namePage}
        nameButton={nameButton}
      />
    </Formik>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  userOwnerThisPage: state.user.userOwnerThisPage,
})

export default connect(mapStateToProps)(FormDataUsers)
