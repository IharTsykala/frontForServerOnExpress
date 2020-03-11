import { Action } from "../interfaces/action.interface"
import {Message} from "../../interfaces/message.interface"

export const ActionTypes = {
  ALL_MESSAGE_FOR_CURRENT_DIALOG: "[listMessagesForCurrentDialog] list messages for current dialog",
  GET_ALL_MESSAGES_FOR_CURRENT_DIALOG: "[ getAllMessagesCurrentDialogAction]  get all messages current dialog action",
  PUT_IN_STORE_ALL_MESSAGES_FOR_CURRENT_DIALOG: "[putInStoreAllMessagesCurrentDialogAction] put in store all messages current dialog action",

  GET_NEW_MESSAGE_FOR_CURRENT_DIALOG: "[getNewMessageInCurrentDialog] get new message in currentDialog" ,
  PUT_IN_STORE_NEW_MESSAGE_FOR_CURRENT_DIALOG: "[getNewMessageInCurrentDialog] get new message in currentDialog",
  GET_FAILURE: "[getFailureAction] get failure action"
}

// export const listMessagesForCurrentDialogAction = (listMessagesForCurrentDialog: []): Action<[]> => ({
//   type: ActionTypes.ALL_MESSAGE_FOR_CURRENT_DIALOG,
//   payload: listMessagesForCurrentDialog
// })

export const getAllMessagesCurrentDialogAction = (allMessagesCurrentDialogAction: [Message]): Action<any> => ({
  type: ActionTypes.GET_ALL_MESSAGES_FOR_CURRENT_DIALOG,
  payload: allMessagesCurrentDialogAction
})

export const putInStoreAllMessagesCurrentDialogAction = (allMessagesCurrentDialogAction: [Message]): Action<any> => ({
  type: ActionTypes.PUT_IN_STORE_ALL_MESSAGES_FOR_CURRENT_DIALOG,
  payload: allMessagesCurrentDialogAction
})

export const getNewMessageInCurrentDialogAction = (newMessageInCurrentDialog: Message): Action<{}> => ({ 
  type: ActionTypes.GET_NEW_MESSAGE_FOR_CURRENT_DIALOG,
  payload: newMessageInCurrentDialog
})

export const putInStoreNewMessageInCurrentDialogAction = (newMessageInCurrentDialog: Message): Action<{}> => ({
  type: ActionTypes.PUT_IN_STORE_NEW_MESSAGE_FOR_CURRENT_DIALOG,
  payload: newMessageInCurrentDialog
})

export const getFailureAction = (error?: any): Action<any> => ({
  type: ActionTypes.GET_FAILURE,
  payload: error
})
