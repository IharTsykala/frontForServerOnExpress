import { Dialog } from "../../interfaces/dialog.interface"
import { Message } from "../../interfaces/message.interface"
import { ActionTypes } from "./dialogs.actions"
import { Action } from "../interfaces/action.interface"

export interface State {
  currentDialog: Dialog
  allDialogs: [Dialog]
  messagesForCurrentDialog: [Message]
}

const initialState: State = {
  currentDialog: {} as Dialog,
  allDialogs: [{} as Dialog],
  messagesForCurrentDialog: [{} as Message],
}

export const dialogReducer = (
  state: State = initialState,
  action: Action<any>
) => {
  switch (action.type) {
  case ActionTypes.SET_CURRENT_DIALOG_IN_STORE:
    return {
      ...state,
      currentDialog: action.payload
    }
  case ActionTypes.SET_ALL_USER_DIALOGS_IN_STORE:
    return {
      ...state,
      allDialogs: action.payload
    }
  case ActionTypes.SET_IN_STORE_ALL_MESSAGES_FOR_CURRENT_DIALOG:
    return {
      ...state,
      messagesForCurrentDialog: action.payload
    }
  case ActionTypes.SET_IN_STORE_NEW_MESSAGE_FOR_CURRENT_DIALOG:
    return {
      ...state,
      messagesForCurrentDialog: state.messagesForCurrentDialog.concat(action.payload)
    }
  default:
    return state
  }
}
