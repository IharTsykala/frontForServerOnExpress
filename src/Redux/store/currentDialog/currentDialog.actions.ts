import { Action } from "../interfaces/action.interface"
import { CurrentDialog } from "../../interfaces/currentDialog.interface"

export const ActionTypes = {
  ADD_CURRENT_DIALOG: "[currentDialog] add current dialog"
}

export const currentDialogAction = (
  currentDialog: CurrentDialog
): Action<CurrentDialog> => ({
  type: ActionTypes.ADD_CURRENT_DIALOG,
  payload: currentDialog
})
