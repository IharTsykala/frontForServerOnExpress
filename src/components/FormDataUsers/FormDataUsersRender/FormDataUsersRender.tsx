import React from "react"
import { Field, Form, ErrorMessage } from "formik"
import {
  UserFormViewModes,
  UserFormViewButtons,
} from "../../../shared/constants/user-from-view-mode.enum"
import FormDataUsersRenderCSS from "./FormDataUsersRender.module.css"
import { User } from "../../../Redux/entitiesInterface/user.interface"
import { Button } from "@material-ui/core"
import useStyles from "./FormDataUsersUseStyles"
import { TextField } from "formik-material-ui"

type FormDataUsersRenderProps = {
  user: User,
  userOwnerThisPage: User,
  namePage: UserFormViewModes,
  nameButton: UserFormViewButtons,
}

const FormDataUsersRender: React.FC<FormDataUsersRenderProps> = ({
  user,
  userOwnerThisPage,
  namePage,
  nameButton,
}) => {
  const classes = useStyles()
  return (
    <Form
      className={`${FormDataUsersRenderCSS.form_logIn_container} ${classes.root}`}
    >
      <Field
        name="login"
        required
        label="Login"
        component={TextField}
        className={FormDataUsersRenderCSS.form_logIn__fields_container}
      />
      <ErrorMessage name="login" />
      <Field
        name="password"
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        component={TextField}
        className={FormDataUsersRenderCSS.form_logIn__fields_container}
      />
      <ErrorMessage name="password" />
      {(namePage === UserFormViewModes.Edit ||
        namePage === UserFormViewModes.SingUp) && (
        <>
          <Field
            name="firstName"
            label="First Name"
            component={TextField}
            className={FormDataUsersRenderCSS.form_logIn__fields_container}
          />
          <ErrorMessage name="firstName" />
          <Field
            name="lastName"
            label="Last Name"
            component={TextField}
            className={FormDataUsersRenderCSS.form_logIn__fields_container}
          />
          <ErrorMessage name="lastName" />
          <Field
            name="email"
            type="email"
            label="Email Address"
            component={TextField}
            className={FormDataUsersRenderCSS.form_logIn__fields_container}
          />
          <ErrorMessage name="email" />
          <Field
            name="phone"
            label="Phone"
            component={TextField}
            className={FormDataUsersRenderCSS.form_logIn__fields_container}
          />
          <ErrorMessage name="phone" />
          <Field
            name="role"
            disabled
            label="Role"
            component={TextField}
            className={FormDataUsersRenderCSS.form_logIn__fields_container}
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
  )
}

export default FormDataUsersRender
