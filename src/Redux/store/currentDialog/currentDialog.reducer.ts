import { CurrentDialog } from "../../interfaces/currentDialog.interface"
import { ActionTypes } from "./currentDialog.actions"
import { Action } from "../interfaces/action.interface"

export interface State {
  currentDialog: CurrentDialog
}

const initialState: State = {
  currentDialog: {} as CurrentDialog
}

export const currentDialogReducer = (
  state: State = initialState,
  action: Action<{}>
) => {
  switch (action.type) {
    case ActionTypes.ADD_CURRENT_DIALOG:
      return {
        ...state,
        currentDialog: action.payload
      }
    default:
      return state
  }
}
