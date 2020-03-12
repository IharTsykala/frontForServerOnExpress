import { put, takeEvery, takeLatest } from "redux-saga/effects"
import {
  ActionTypes,
  putInStoreAllMessagesCurrentDialogAction,
  putInStoreNewMessageForCurrentDialogAction,
  getFailureAction
} from "./listMessagesForCurrentDialog.actions"

function* putInStoreAllMessagesCurrentDialog(actions: any) {
  try {    
    console.log(actions.payload)  
    yield put( putInStoreAllMessagesCurrentDialogAction(actions.payload))
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
  );
  yield takeEvery(
    ActionTypes.GET_NEW_MESSAGE_FOR_CURRENT_DIALOG,
    putInStoreNewMessageForCurrentDialog2
  );
}
