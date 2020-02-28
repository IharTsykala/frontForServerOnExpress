import { ActionTypes } from "./userOwnerPage.actions"
import { Action } from "../interfaces/action.interface"
import { UserOwnerPage } from "../../interfaces/userOwnerPage.interface"

export interface State {
  user: UserOwnerPage
  // user2: User
}

const initialState: State = {
  user: {} as UserOwnerPage
  // user2: {} as User
}

export const userOwnerPage = (state: State = initialState, action: Action<{}>) => {
  switch (action.type) {
    case ActionTypes.USER_OWNER_PAGE:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}
