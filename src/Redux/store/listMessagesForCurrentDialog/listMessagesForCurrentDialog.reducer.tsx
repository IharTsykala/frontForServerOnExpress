import { ActionTypes } from "./listMessagesForCurrentDialog.actions"
import { Action } from "../interfaces/action.interface"
import { Message } from "../../interfaces/message.interface"
export interface State {  
  listMessagesForCurrentDialog: [Message]
}

const initialState: State = {  
  listMessagesForCurrentDialog: [{} as Message]
}

export const listMessagesForCurrentDialogReducer = (state: State = initialState, action: Action<[]>) => {
  switch (action.type) {
    case ActionTypes.ALL_MESSAGE_FOR_CURRENT_DIALOG:
      return {
        ...state,
        listMessagesForCurrentDialog: action.payload
      }  
    default:
      return state
  }
}