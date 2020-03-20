import { put, takeEvery } from "redux-saga/effects"
import ServiceMessage from "../../../services/service-message"
import {
  ActionTypes,
  putInStoreAllMessagesCurrentDialogAction,
  putInStoreNewMessageForCurrentDialogAction,
  getFailureAction
} from "./listMessagesForCurrentDialog.actions"

function* putInStoreAllMessagesCurrentDialog(actions: any) {
  try {
    const list = yield ServiceMessage.getAllMessagesByIdDialog(actions.payload)
    yield put(putInStoreAllMessagesCurrentDialogAction(list))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

function* putInStoreNewMessageForCurrentDialog2(actions: any) {
  try {
    console.log(actions.payload)
    yield put(putInStoreNewMessageForCurrentDialogAction(actions.payload))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

export default function* putInStoreNewMessageForCurrentDialogSaga() {
  yield takeEvery(
    ActionTypes.GET_ALL_MESSAGES_FOR_CURRENT_DIALOG,
    putInStoreAllMessagesCurrentDialog
  )
  yield takeEvery(
    ActionTypes.GET_NEW_MESSAGE_FOR_CURRENT_DIALOG,
    putInStoreNewMessageForCurrentDialog2
  )
}
