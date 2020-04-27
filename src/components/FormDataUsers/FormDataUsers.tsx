import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import {
  UserFormViewModes,
  UserFormViewButtons,
} from "../../shared/constants/user-from-view-mode.enum"
import FormDataUsersCSS from "./FormDataUsers.module.css"
import { connect } from "react-redux"
import { User } from "../../Redux/entitiesInterface/user.interface"
import { FormLabel } from "@material-ui/core"
import { TextField } from "formik-material-ui"

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
        login: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        firstName: Yup.string().max(10, "Must be 10 characters or less"),
        lastName: Yup.string().max(10, "Must be 10 characters or less"),
        email: Yup.string().email("Invalid email address"),
        // phone: Yup.string().phone<string>("Invalid email address")
      })}
      onSubmit={(values: {}) => {
        submitHandler(user ? user._id : undefined, values)
      }}
    >
      <Form className={FormDataUsersCSS.form_logIn_container}>
        <FormLabel htmlFor="login">
          Login
          <Field
            id="standard-basic"
            label="Login"
            // id="standard-required"
            component={TextField}
            className={FormDataUsersCSS.user_information__edit__label__input}
            // id="login"
            name="login"
            type="text"
          />
        </FormLabel>
        <ErrorMessage name="login" />
        <FormLabel htmlFor="password">
          Password
          <Field name="password" type="text" />
        </FormLabel>
        <ErrorMessage name="role" />
        {(namePage === UserFormViewModes.Edit ||
          namePage === UserFormViewModes.SingUp) && (
          <>
            <FormLabel htmlFor="firstName">
              First Name
              <Field name="firstName" type="text" />
            </FormLabel>
            <ErrorMessage name="firstName" />
            <FormLabel htmlFor="lastName">
              Last Name
              <Field name="lastName" type="text" />
            </FormLabel>
            <ErrorMessage name="lastName" />
            <FormLabel htmlFor="email">
              Email Address
              <Field name="email" type="email" />
            </FormLabel>
            <ErrorMessage name="email" />
            <FormLabel htmlFor="phone">
              Phone
              <Field name="phone" type="text" />
            </FormLabel>
            <ErrorMessage name="phone" />
            <FormLabel htmlFor="role">
              Role
              <Field name="role" type="text" disabled />
            </FormLabel>
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
  user: state.user.user,
  userOwnerThisPage: state.user.userOwnerThisPage,
})

export default connect(mapStateToProps)(FormDataUsers)
