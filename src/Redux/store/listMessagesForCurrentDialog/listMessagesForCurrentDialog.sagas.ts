import { put, takeEvery, takeLatest } from "redux-saga/effects"
import {
  ActionTypes,
  putInStoreAllMessagesCurrentDialogAction,
  putInStoreNewMessageInCurrentDialogAction,
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

function* putInStoreNewMessageInCurrentDialog2(actions: any) {
  try {  
    console.log(actions.payload)  
    yield put(putInStoreNewMessageInCurrentDialogAction(actions.payload))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

export default function* putInStoreNewMessageInCurrentDialogSaga() {
  yield takeEvery(
    ActionTypes.GET_ALL_MESSAGES_FOR_CURRENT_DIALOG,    
    putInStoreAllMessagesCurrentDialog
  );
  yield takeLatest(
    ActionTypes.GET_NEW_MESSAGE_FOR_CURRENT_DIALOG,
    putInStoreNewMessageInCurrentDialog2
  );
}
