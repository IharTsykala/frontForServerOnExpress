import { Action } from "../interfaces/action.interface"
import { User } from "./../../interfaces/user.interface"
export const ActionTypes = {
  USER_LOGIN: "[user] User login"
}

export const userLogIn = (user: User): Action<User> => ({
  type: ActionTypes.USER_LOGIN,
  payload: user
})
