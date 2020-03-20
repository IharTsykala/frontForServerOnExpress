import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import {
  UserFormViewModes,
  UserFormViewButtons
} from "../../shared/constants/user-from-view-mode.enum"
import FormDataUsersCSS from "./FormDataUsers.module.css"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { UserOwnerThisPageInterface } from "../../Redux/interfaces/userOwnerThisPage.interface"

type FormDataUsersProps = {
  user: User
  userOwnerThisPage: UserOwnerThisPageInterface
  submitHandler: any
  namePage: UserFormViewModes
  nameButton: UserFormViewButtons
}

const FormDataUsers: React.FC<FormDataUsersProps> = ({
  user,
  userOwnerThisPage,
  submitHandler,
  namePage,
  nameButton
}) => {
  return (
    <Formik
      initialValues={{
        login:  "",
        password: "",
        firstName:  "",
        lastName:  "",
        email:  "",
        phone:  "",
        role: userOwnerThisPage ? userOwnerThisPage.role : "user"
      }}
      validationSchema={Yup.object({
        login: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        firstName: Yup.string().max(15, "Must be 15 characters or less"),
        lastName: Yup.string().max(20, "Must be 20 characters or less"),
        email: Yup.string().email("Invalid email address")
        // phone: Yup.string().phone<string>("Invalid email address")
      })}
      onSubmit={values => {
        submitHandler(user ? user._id : undefined, values)
      }}
    >
      <Form
        className={FormDataUsersCSS.user_information__edit || "form-data-users"}
      >
        <label htmlFor="login">
          Login
          <Field
            className={FormDataUsersCSS.user_information__edit__label__input}
            id="login"
            name="login"
            type="text"
          />
        </label>
        <ErrorMessage name="login" />
        <label htmlFor="password">
          Password
          <Field name="password" type="text" />
        </label>
        <ErrorMessage name="role" />
        {(namePage === UserFormViewModes.Edit ||
          namePage === UserFormViewModes.SingUp) && (
          <>
            <label htmlFor="firstName">
              First Name
              <Field name="firstName" type="text" />
            </label>
            <ErrorMessage name="firstName" />
            <label htmlFor="lastName">
              Last Name
              <Field name="lastName" type="text" />
            </label>
            <ErrorMessage name="lastName" />
            <label htmlFor="email">
              Email Address
              <Field name="email" type="email" />
            </label>
            <ErrorMessage name="email" />
            <label htmlFor="phone">
              Phone
              <Field name="phone" type="text" />
            </label>
            <ErrorMessage name="phone" />
            <label htmlFor="role">
              Role
              <Field name="role" type="text" disabled />
            </label>
            <ErrorMessage name="role" />
          </>
        )}
        {namePage !== UserFormViewModes.Edit && (
          <button type="submit">{`${nameButton}`}</button>
        )}
        {namePage === UserFormViewModes.Edit &&
          (user.role === "admin" || user._id === userOwnerThisPage._id) && (
            <button type="submit">{`${nameButton}`}</button>
          )}
      </Form>
    </Formik>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  userOwnerThisPage: state.userOwnerThisPage.userOwnerThisPage
})

export default connect(mapStateToProps)(FormDataUsers)
