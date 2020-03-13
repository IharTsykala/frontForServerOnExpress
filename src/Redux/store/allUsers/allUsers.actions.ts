import { Action } from "../interfaces/action.interface"
import {User} from "../../interfaces/user.interface"

export const ActionTypes = {
  ALL_USERS: "[allUsers] all users",

  GET_ALL_USERS_FOR_SAGAS:   "[getAllUsersForSagas] get all users for sagas",
  PUT_ALL_USERS_IN_STATE:   "[putAllUsersInState] put all users in state",

  GET_FAILURE: "[getFailureAction] get failure action"
}

export const AllUsersAction = (allUsers: []): Action<[]> => ({
  type: ActionTypes.ALL_USERS,
  payload: allUsers
})

export const getAllUsersForSagasAction = (userId: String): Action<String> => ({
  type: ActionTypes.GET_ALL_USERS_FOR_SAGAS,
  payload: userId
})

export const putAllUsersInStateAction = (allUsers: [User]): Action<any> => ({
  type: ActionTypes.PUT_ALL_USERS_IN_STATE,
  payload: allUsers
})

export const getFailureAction = (error?: any): Action<any> => ({
  type: ActionTypes.GET_FAILURE,
  payload: error
})