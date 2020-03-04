import { Action } from "../interfaces/action.interface"

export const ActionTypes = {
  ALL_USERS: "[allUsers] all users"  
}

export const AllUsersAction = (allUsers: []): Action<[]> => ({
  type: ActionTypes.ALL_USERS,
  payload: allUsers
})
