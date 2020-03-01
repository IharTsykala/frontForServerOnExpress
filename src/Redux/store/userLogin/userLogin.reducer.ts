import { ActionTypes } from "./userLogin.actions"
import { Action } from "../interfaces/action.interface"
import { User } from "../../interfaces/user.interface"

export interface State {
  user: User
  // user2: User

}

const initialState: State = {
  user: {} as User,
  // user2: {} as User
}

export const reducer = (state: State = initialState, action: Action<{}>) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}
