import { ActionTypes } from "./checkBoxState.actions"
import { Action } from "../interfaces/action.interface"
import { CheckBoxState } from "../../interfaces/checkBoxState.interface"

export interface State {
  checkBoxState:  CheckBoxState
}

const initialState: State = {
  checkBoxState:{checkBoxState:  false} as CheckBoxState
}

export const checkBoxStateReducer = (
  state: State = initialState,
  action: Action<any>
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
        checkBoxState: !action.payload
      }
    default:
      return state
  }
}
