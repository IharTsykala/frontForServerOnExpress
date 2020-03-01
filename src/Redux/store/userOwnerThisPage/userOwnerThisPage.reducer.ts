import { ActionTypes } from "./userOwnerThisPage.actions"
import { Action } from "../interfaces/action.interface"
import { UserOwnerThisPageInterface } from "../../interfaces/userOwnerThisPage.interface"

export interface State {
  userOwnerThisPage: UserOwnerThisPageInterface
  // user2: User
}

const initialState: State = {
  userOwnerThisPage: {} as UserOwnerThisPageInterface
  // user2: {} as User
}

export const userOwnerThisPageReducer = (state: State = initialState, action: Action<{}>) => {
  switch (action.type) {
    case ActionTypes.USER_OWNER_THIS_PAGE:
      return {
        ...state,
        userOwnerThisPage: action.payload
      }
    default:
      return state
  }
}
