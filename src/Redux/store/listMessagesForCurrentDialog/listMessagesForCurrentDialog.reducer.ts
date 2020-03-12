import { ActionTypes } from "./listMessagesForCurrentDialog.actions"
import { Action } from "../interfaces/action.interface"
import { Message } from "../../interfaces/message.interface"
export interface State {  
  listMessagesForCurrentDialog: [Message]
}

const initialState: State = {  
  listMessagesForCurrentDialog: [{} as Message]
}

export const listMessagesForCurrentDialogReducer = (state: State = initialState, action: Action<any>) => {
  switch (action.type) {
    case ActionTypes.PUT_IN_STORE_ALL_MESSAGES_FOR_CURRENT_DIALOG:
      return {
        ...state,
        listMessagesForCurrentDialog: action.payload
      }
      case ActionTypes.PUT_IN_STORE_NEW_MESSAGE_FOR_CURRENT_DIALOG:
      return {
        ...state,
        listMessagesForCurrentDialog: state.listMessagesForCurrentDialog.concat(action.payload)
      }  
    default:
      return state
  }
}