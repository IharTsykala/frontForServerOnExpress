import { Action } from "../interfaces/action.interface"
import { Dialog } from "../../interfaces/dialog.interface"

export const ActionTypes = {
  ADD_CURRENT_DIALOG: "[Dialog] add current dialog",
  GET_ALL_DIALOGS_BY_USER_ID: "[Dialog] Get all dialogs by userId",
  SET_ALL_DIALOGS_BY_USER_ID: "[Dialog] Set all dialogs by userId",
  ADD_DIALOG: "[Dialog] Add dialog",
  GET_FAILURE: "[getFailureAction] get failure action"
}

export const currentDialogAction = (currentDialog: Dialog): Action<Dialog> => ({
  type: ActionTypes.ADD_CURRENT_DIALOG,
  payload: currentDialog
})

export const getAllDialogsByUserIdAction = (
  userId: string
): Action<string> => ({
  type: ActionTypes.GET_ALL_DIALOGS_BY_USER_ID,
  payload: userId
})

export const setAllDialogsByUserIdInStoreAction = (
  dialogs: [Dialog]
): Action<[Dialog]> => ({
  type: ActionTypes.SET_ALL_DIALOGS_BY_USER_ID,
  payload: dialogs
})

export const addDialogAction = (dialog: {}): Action<{}> => ({
  type: ActionTypes.ADD_DIALOG,
  payload: dialog
})

export const getFailureAction = (error?: any): Action<any> => ({
  type: ActionTypes.GET_FAILURE,
  payload: error
})
