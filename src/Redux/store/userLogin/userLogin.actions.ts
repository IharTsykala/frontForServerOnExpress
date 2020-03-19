import { Action } from "../interfaces/action.interface"
import { User } from "../../interfaces/user.interface"
import { UserLogOut } from "../../interfaces/userLogOut.interface"

export const ActionTypes = {
  USER_LOGIN: "[user] User login",
  USER_LOGOUT: "[user] User logout",
  USER_REFRESH: "[user] User refresh",
  GET_USER_LOGIN_FOR_SAGA: "[user] Get user login for saga",
  SET_USER_LOGIN_IN_STORE: "[user] Set user login for saga",
  GET_FAILURE: "[getFailureAction] get failure action"
}

export const userLogIn = (user: User): Action<User> => ({
  type: ActionTypes.USER_LOGIN,
  payload: user
})

export const userLogOutAction = (): Action<UserLogOut> => ({
  type: ActionTypes.USER_LOGOUT
})

export const userRefreshAction = (user: User): Action<User> => ({
  type: ActionTypes.USER_REFRESH,
  payload: user
})

export const getUserLoginForSagaAction = (): Action<any> => ({
  type: ActionTypes.GET_USER_LOGIN_FOR_SAGA 
})

export const setUserLoginInStoreAction = (user: User): Action<User> => ({
  type: ActionTypes.SET_USER_LOGIN_IN_STORE,
  payload: user
})

export const getFailureAction = (error?: any): Action<any> => ({
  type: ActionTypes.GET_FAILURE,
  payload: error
})

