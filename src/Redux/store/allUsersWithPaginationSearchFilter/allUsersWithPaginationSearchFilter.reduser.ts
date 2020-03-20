import { ActionTypes } from "./allUsersWithPaginationSearchFilter.actions"
import { Action } from "../interfaces/action.interface"
import { User } from "../../interfaces/user.interface"
export interface State {
  allUsers: [User]
}

const initialState: State = {
  allUsers: [{} as User]
}

export const allUserReducer = (
  state: State = initialState,
  action: Action<[]>
) => {
  switch (action.type) {
    case ActionTypes.SET_ALL_USERS_WITH_PAGINATION_SEARCH_FILTER:
      return {
        ...state,
        allUsers: action.payload
      }
    default:
      return state
  }
}
