import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import {
  UserFormViewModes,
  UserFormViewButtons
} from "../../shared/constants/user-from-view-mode.enum"
import FormDataUsersCSS from './FormDataUsers.module.css'

type FormDataUsersProps = {
  userOwnerPage?: any
  submitHandler: any
  namePage: UserFormViewModes
  nameButton: UserFormViewButtons
  userRole?: string
  homePageStatus?: any
}

const FormDataUsers: React.FC<FormDataUsersProps> = ({
  userOwnerPage,
  submitHandler,
  namePage,
  nameButton,
  userRole,
  homePageStatus
}) => {  
  return (
    <Formik
      initialValues={{
        login: userOwnerPage ? userOwnerPage.login : "",
        password: "",
        firstName: userOwnerPage ? userOwnerPage.firstName : "",
        lastName: userOwnerPage ? userOwnerPage.lastName : "",
        email: userOwnerPage ? userOwnerPage.email : "",
        phone: userOwnerPage ? userOwnerPage.phone : "",
        role: userOwnerPage ? userOwnerPage.role : "user"
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
        submitHandler(userOwnerPage ? userOwnerPage._id : undefined, values)
      }}
    >
      <Form className={homePageStatus && FormDataUsersCSS.user_information__edit || "form-data-users"}>
        <label htmlFor="login">Login
        <Field className={FormDataUsersCSS.user_information__edit__label__input} id="login" name="login" type="text" />
        </label>
        {/* <Field id="login" name="login" type="text" /> */}
        <ErrorMessage name="login" />
        <label htmlFor="password">Password
        <Field name="password" type="text" />
        </label>
        {/* <Field name="password" type="text" /> */}
        <ErrorMessage name="role" />
        {(namePage === UserFormViewModes.Edit ||
          namePage === UserFormViewModes.SingUp) && (
          <>
            <label htmlFor="firstName">First Name
            <Field name="firstName" type="text" />
            </label>
            {/* <Field name="firstName" type="text" /> */}
            <ErrorMessage name="firstName" />
            <label htmlFor="lastName">Last Name
            <Field name="lastName" type="text" />
            </label>
            {/* <Field name="lastName" type="text" /> */}
            <ErrorMessage name="lastName" />
            <label htmlFor="email">Email Address
            <Field name="email" type="email" />
            </label>
            {/* <Field name="email" type="email" /> */}
            <ErrorMessage name="email" />
            <label htmlFor="phone">Phone
            <Field name="phone" type="text" />
            </label>
            {/* <Field name="phone" type="text" /> */}
            <ErrorMessage name="phone" />
            {/* <label htmlFor="role">Role
            <Field name="role" type="text" disabled />
            </label> */}
            {/* <Field name="role" type="text" disabled /> */}
            <ErrorMessage name="role" />
          </>
        )}
        {namePage !== UserFormViewModes.Edit && (
          <button type="submit">{`${nameButton}`}</button>
        )}
        {namePage === UserFormViewModes.Edit &&
          (userRole === "admin" || homePageStatus) && (
            <button type="submit">{`${nameButton}`}</button>
          )}
      </Form>
    </Formik>
  )
}

export default FormDataUsers
