import { Action } from "../interfaces/action.interface"
import { CheckBoxState } from "../../interfaces/checkBoxState.interface"

export const ActionTypes = {
  SET_CHECK_BOX_STATE: "[setCheckBoxState] set check box state",
  CHANGE_CHECK_BOX_STATE: "[changeCheckBoxState] change check box state"
}

export const setCheckBoxStateAction = (
  checkBoxState: CheckBoxState
): Action<CheckBoxState> => ({
  type: ActionTypes.SET_CHECK_BOX_STATE,
  payload: checkBoxState
})

export const changeCheckBoxStateAction = (
  checkBoxState: CheckBoxState
): Action<CheckBoxState> => ({
  type: ActionTypes.CHANGE_CHECK_BOX_STATE,
  payload: checkBoxState
})
