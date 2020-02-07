import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import {
  UserFormViewModes,
  UserFormViewButtons
} from "../shared/constants/user-from-view-mode.enum"
// import "../styles/FormDataUsers"

type FormDataUsersProps = {
  user?: any
  submitHandler: any
  namePage: UserFormViewModes
  nameButton: UserFormViewButtons
}

const FormDataUsers: React.FC<FormDataUsersProps> = ({
  user,
  submitHandler,
  namePage,
  nameButton
}) => {
  return (
    <Formik
      initialValues={{
        login: user ? user.login : "",
        password: "",
        firstName: user ? user.firstName : "",
        lastName: user ? user.lastName : "",
        email: user ? user.email : "",
        phone: user ? user.phone : "",
        role: user ? user.role : "user",
        // subscribe: [],
        // subscribers: [],
        // friends: []
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
      <Form className="form-data-users">
        <label htmlFor="login">Login</label>
        <Field name="login" type="text" />
        <ErrorMessage name="login" />
        <label htmlFor="password">Password</label>
        <Field name="password" type="text" />
        <ErrorMessage name="role" />
        {(namePage === UserFormViewModes.Edit ||
          namePage === UserFormViewModes.SingUp) && (
          <>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" />
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" />
            <ErrorMessage name="lastName" />
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
            <label htmlFor="phone">Phone</label>
            <Field name="phone" type="text" />
            <ErrorMessage name="phone" />
            <label htmlFor="role">Role</label>
            <Field name="role" type="text" disabled />
            <ErrorMessage name="role" />
          </>
        )}
        <button type="submit">{`${nameButton}`}</button>
      </Form>
    </Formik>
  )
}

export default FormDataUsers
