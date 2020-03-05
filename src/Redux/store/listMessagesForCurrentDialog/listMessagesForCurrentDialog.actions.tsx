import { Action } from "../interfaces/action.interface"

export const ActionTypes = {
  ALL_MESSAGE_FOR_CURRENT_DIALOG: "[listMessagesForCurrentDialog] list messages for current dialog"  
}

export const listMessagesForCurrentDialogAction = (listMessagesForCurrentDialog: []): Action<[]> => ({
  type: ActionTypes.ALL_MESSAGE_FOR_CURRENT_DIALOG,
  payload: listMessagesForCurrentDialog
})
