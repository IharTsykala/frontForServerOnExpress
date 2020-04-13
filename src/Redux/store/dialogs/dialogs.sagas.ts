import { put, takeEvery } from "redux-saga/effects"
import ServiceDialog from "../../../services/service-dialog"
import ServiceMessage from "../../../services/service-message"
import {
  ActionTypes,
  setAllUserDialogInStore,
  setInStoreAllMessagesCurrentDialog,
  getFailureAction,
} from "./dialogs.actions"

function* setAllDialogsByUserIdInStore(actions: any) {
  try {
    const listForRender = yield ServiceDialog.getAllDialogsById(actions.payload)
    yield put(setAllUserDialogInStore(listForRender))
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

function* setInStoreAllMessagesCurrentDialogSaga(actions: any) {
  try {
    const list = yield ServiceMessage.getAllMessagesByIdDialog(actions.payload)
    yield put(setInStoreAllMessagesCurrentDialog(list))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

export default function* dialogSaga() {
  yield takeEvery(
    ActionTypes.GET_ALL_DIALOGS_BY_USER_ID,
    setAllDialogsByUserIdInStore
  )
  yield takeEvery(ActionTypes.ADD_NEW_DIALOG, addDialog)
  yield takeEvery(
    ActionTypes.GET_ALL_MESSAGES_FOR_CURRENT_DIALOG,
    setInStoreAllMessagesCurrentDialogSaga
  )
}
