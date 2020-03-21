import { put, takeEvery } from "redux-saga/effects"
import ServiceDialog from "../../../services/service-dialog"

import {
  ActionTypes,
  setAllDialogsByUserIdInStoreAction,
  getFailureAction
} from "./dialogs.actions"

function* setAllDialogsByUserIdInStore(actions: any) {
  try {
    const listForRender = yield ServiceDialog.getAllDialogsById(actions.payload)
    yield put(setAllDialogsByUserIdInStoreAction(listForRender))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

function* addDialog(actions: any) {
  try {
    yield ServiceDialog.addDialog(actions.payload)
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

export default function* dialogSaga() {
  yield takeEvery(
    ActionTypes.GET_ALL_DIALOGS_BY_USER_ID,
    setAllDialogsByUserIdInStore
  )
  yield takeEvery(ActionTypes.ADD_DIALOG, addDialog)
}
