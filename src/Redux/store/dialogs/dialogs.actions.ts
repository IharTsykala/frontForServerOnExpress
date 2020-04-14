import { Action } from "../../actionsInterface/action.interface"
import { Dialog } from "../../entitiesInterface/dialog.interface"
import { Message } from "../../entitiesInterface/message.interface"

export const ActionTypes = {
  // dialog
  SET_CURRENT_DIALOG_IN_STORE: "[dialog] set current dialog in store",
  GET_ALL_DIALOGS_BY_USER_ID: "[dialog] get all dialogs by userId",
  SET_ALL_USER_DIALOGS_IN_STORE: "[dialog] set all dialogs by userId",
  ADD_NEW_DIALOG: "[dialog] add new dialog",
  //message
  GET_ALL_MESSAGES_FOR_CURRENT_DIALOG:
    "[message]  get all messages for current dialog",
  SET_IN_STORE_ALL_MESSAGES_FOR_CURRENT_DIALOG:
    "[message] set in store all messages for current dialog",
  SET_IN_STORE_NEW_MESSAGE_FOR_CURRENT_DIALOG:
    "[message] set in store new message for current dialog",

  GET_FAILURE: "[getFailureAction] get failure action",
}

//dialog
export const setCurrentDialogInStore = (
  currentDialog: Dialog
): Action<Dialog> => ({
  type: ActionTypes.SET_CURRENT_DIALOG_IN_STORE,
  payload: currentDialog,
})

export const getAllDialogsByUserId = (userId: string): Action<string> => ({
  type: ActionTypes.GET_ALL_DIALOGS_BY_USER_ID,
  payload: userId,
})

export const setAllUserDialogInStore = (
  dialogs: [Dialog]
): Action<[Dialog]> => ({
  type: ActionTypes.SET_ALL_USER_DIALOGS_IN_STORE,
  payload: dialogs,
})

export const addNewDialog = (dialog: {}): Action<{}> => ({
  type: ActionTypes.ADD_NEW_DIALOG,
  payload: dialog,
})

// message
export const getAllMessagesCurrentDialog = (
  currentDialogId: string
): Action<string> => ({
  type: ActionTypes.GET_ALL_MESSAGES_FOR_CURRENT_DIALOG,
  payload: currentDialogId,
})

export const setInStoreAllMessagesCurrentDialog = (
  allMessagesCurrentDialogAction: [Message]
): Action<any> => ({
  type: ActionTypes.SET_IN_STORE_ALL_MESSAGES_FOR_CURRENT_DIALOG,
  payload: allMessagesCurrentDialogAction,
})

export const setInStoreNewMessageForCurrentDialog = (
  newMessageForCurrentDialog: Message
): Action<{}> => ({
  type: ActionTypes.SET_IN_STORE_NEW_MESSAGE_FOR_CURRENT_DIALOG,
  payload: newMessageForCurrentDialog,
})

export const getFailureAction = (error?: any): Action<any> => ({
  type: ActionTypes.GET_FAILURE,
  payload: error,
})
