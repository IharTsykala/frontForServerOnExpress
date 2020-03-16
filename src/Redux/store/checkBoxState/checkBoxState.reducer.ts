import { ActionTypes } from "./checkBoxState.actions"
import { Action } from "../interfaces/action.interface"
// import { CheckBoxState } from "../../interfaces/checkBoxState.interface"

export interface State {
  checkBoxState: boolean
  prevCheckBoxState: boolean|undefined
}

const initialState: State = {
  checkBoxState: false,
  prevCheckBoxState: undefined
}

export const checkBoxStateReducer = (
  state: State = initialState,
  action: Action<{}>
) => {
  switch (action.type) {
    case ActionTypes.SET_CHECK_BOX_STATE:
      return {
        ...state,
        checkBoxState: action.payload
      }
    case ActionTypes.CHANGE_CHECK_BOX_STATE:
      return {
        ...state,
        checkBoxState: !state.checkBoxState
      }
    case ActionTypes.SET_PREV_CHECK_BOX_STATE:
      return {
        ...state,
        prevCheckBoxState: action.payload
      }
    default:
      return state
  }
}
