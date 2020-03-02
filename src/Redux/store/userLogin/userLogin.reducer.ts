import { ActionTypes } from "./userLogin.actions"
import { Action } from "../interfaces/action.interface"
import { User } from "../../interfaces/user.interface"
export interface State {
  user: User
}

const initialState: State = {
  user: {} as User
}

export const reducer = (state: State = initialState, action: Action<{}>) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN:
      return {
        ...state,
        user: action.payload
      }
    case ActionTypes.USER_LOGOUT:
      return {
        ...state,
        user: initialState
      }
    case ActionTypes.USER_REFRESH:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}
