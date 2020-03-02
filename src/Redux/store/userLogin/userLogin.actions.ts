import { Action } from "../interfaces/action.interface"
import { User } from "../../interfaces/user.interface"
import { UserLogOut } from "../../interfaces/userLogOut.interface"

export const ActionTypes = {
  USER_LOGIN: "[user] User login",
  USER_LOGOUT: "[user] User logout",
  USER_REFRESH: "[user] User refresh"
}

export const userLogIn = (user: User): Action<User> => ({
  type: ActionTypes.USER_LOGIN,
  payload: user
})

export const userLogOutAction = (): Action<UserLogOut> => ({
  type: ActionTypes.USER_LOGOUT,  
})

export const userRefreshAction = (user: User): Action<User> => ({
  type: ActionTypes.USER_REFRESH,
  payload: user
})




