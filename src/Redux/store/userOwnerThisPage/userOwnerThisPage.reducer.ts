import { ActionTypes } from "./userOwnerThisPage.actions"
import { Action } from "../interfaces/action.interface"
import { UserOwnerThisPageInterface } from "../../interfaces/userOwnerThisPage.interface"

export interface State {
  userOwnerThisPage: UserOwnerThisPageInterface
}

const initialState: State = {
  userOwnerThisPage: {} as UserOwnerThisPageInterface
}

export const userOwnerThisPageReducer = (
  state: State = initialState,
  action: Action<{}>
) => {
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

export const userOwnerThisPageReducerForSagas = (
  state: State = initialState,
  action: Action<{}>
) => {
  switch (action.type) {
    case ActionTypes.SET_USER_OWNER_THIS_PAGE_FOR_SAGAS:
      return {
        ...state,
        userOwnerThisPage: action.payload
      }
    default:
      return state
  }
}
