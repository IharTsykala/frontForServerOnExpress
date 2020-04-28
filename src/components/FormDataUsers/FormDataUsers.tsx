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
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core"
import { TextField } from "formik-material-ui"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
)

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
  const classes = useStyles()
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
      <Form
        className={`${FormDataUsersCSS.form_logIn_container} ${classes.root}`}
      >
        <Field
          name="login"
          required
          label="Login"
          component={TextField}
          className={FormDataUsersCSS.form_logIn__fields_container}
        />
        <ErrorMessage name="login" />
        <Field
          name="password"
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          component={TextField}
          className={FormDataUsersCSS.form_logIn__fields_container}
        />
        <ErrorMessage name="password" />
        {(namePage === UserFormViewModes.Edit ||
          namePage === UserFormViewModes.SingUp) && (
          <>
            <Field
              name="firstName"
              label="First Name"
              // id="standard-basic"
              component={TextField}
              className={FormDataUsersCSS.form_logIn__fields_container}
            />
            <ErrorMessage name="firstName" />
            <Field
              name="lastName"
              label="Last Name"
              component={TextField}
              className={FormDataUsersCSS.form_logIn__fields_container}
            />
            <ErrorMessage name="lastName" />
            <Field
              name="email"
              type="email"
              label="Email Address"
              component={TextField}
              className={FormDataUsersCSS.form_logIn__fields_container}
            />
            <ErrorMessage name="email" />
            <Field
              name="phone"
              label="Phone"
              component={TextField}
              className={FormDataUsersCSS.form_logIn__fields_container}
            />
            <ErrorMessage name="phone" />
            <Field
              name="role"
              disabled
              label="Role"
              component={TextField}
              className={FormDataUsersCSS.form_logIn__fields_container}
              // defaultValue={user.role || "User"}
            />
            <ErrorMessage name="role" />
          </>
        )}
        {(namePage !== UserFormViewModes.Edit ||
          user.role === "admin" ||
          user._id === userOwnerThisPage._id) && (
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >{`${nameButton}`}</Button>
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
