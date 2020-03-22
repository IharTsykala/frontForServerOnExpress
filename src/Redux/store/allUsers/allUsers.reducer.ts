import { ActionTypes } from "./allUsers.actions"
import { Action } from "../interfaces/action.interface"
import { User } from "../../interfaces/user.interface"
export interface State {
  allUsers: [User]
  allFriends: [User]
}

const initialState: State = {
  allUsers: [{} as User],
  allFriends: [{} as User]
}

export const allUserReducer = (
  state: State = initialState,
  action: Action<[]>
) => {
  switch (action.type) {
    case ActionTypes.ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      }
    case ActionTypes.PUT_ALL_USERS_IN_STATE:
      return {
        ...state,
        allUsers: action.payload
      }
    case ActionTypes.SET_ALL_USERS_WITH_PAGINATION_SEARCH_FILTER:
      return {
        ...state,
        allUsers: action.payload
      }
    case ActionTypes.SET_ALL_FRIENDS_FOR_USER:
      return {
        ...state,
        allFriends: action.payload
      }
    default:
      return state
  }
}
