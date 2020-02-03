import React, { useEffect } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
// import "../styles/FormDataUsers"

type FormDataUsersProps = {
  user: any
  submitHandler: any
}

const FormDataUsers: React.FC<FormDataUsersProps> = ({
  user,
  submitHandler
}) => {
  console.log(user)
  return (
    <Formik
      initialValues={{
        login: user.login || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || ""
      }}
      validationSchema={Yup.object({
        login: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        firstName: Yup.string().max(15, "Must be 15 characters or less"),
        // .required("Required"),
        lastName: Yup.string().max(20, "Must be 20 characters or less"),
        // .required("Required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Required")
        // phone: Yup.string().phone<any>("Invalid email address")
        // .required("Required")
      })}
      onSubmit={values => {
        submitHandler(user._id, values)
      }}
    >
      <Form className="form-data-users">
        <label htmlFor="login">Login</label>
        <Field name="login" type="text" />
        <ErrorMessage name="login" />
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
        <button type="submit">Submit edit</button>
      </Form>
    </Formik>
  )
}

// )

export default FormDataUsers
