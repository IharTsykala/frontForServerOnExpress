import { Dialog } from "../../interfaces/dialog.interface"
import { ActionTypes } from "./dialogs.actions"
import { Action } from "../interfaces/action.interface"

export interface State {
  currentDialog: Dialog
  allDialogs: [Dialog]
}

const initialState: State = {
  currentDialog: {} as Dialog,
  allDialogs: [{} as Dialog]
}

export const dialogReducer = (
  state: State = initialState,
  action: Action<{}>
) => {
  switch (action.type) {
    case ActionTypes.ADD_CURRENT_DIALOG:
      return {
        ...state,
        currentDialog: action.payload
      }
      case ActionTypes.SET_ALL_DIALOGS_BY_USER_ID:
      return {
        ...state,
        allDialogs: action.payload
      }
    default:
      return state
  }
}
