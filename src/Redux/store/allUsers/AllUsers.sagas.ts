import { put, takeEvery } from "redux-saga/effects"
import Service from "../../../services/service-user"
import {
  ActionTypes,  
  putAllUsersInStateAction,
  getFailureAction
} from "./allUsers.actions"

function* putAllUsersInState(actions: any) {
  try { 
    let list
    if(actions.payload==='') list = []
    else list = yield Service.getUserWithSubscriptionsById(actions.payload)  
             
    yield put( putAllUsersInStateAction(list))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

// function* putInStoreNewMessageForCurrentDialog2(actions: any) {
//   try {  
//     console.log(actions.payload)  
//     yield put(putInStoreNewMessageForCurrentDialogAction(actions.payload))
//   } catch (e) {
//     yield put(getFailureAction(e))
//   }
// }

export default function* putInStoreAllUsersSaga() {
  yield takeEvery(
    ActionTypes.GET_ALL_USERS_FOR_SAGAS,    
    putAllUsersInState
  );
//   yield takeEvery(
//     ActionTypes.GET_NEW_MESSAGE_FOR_CURRENT_DIALOG,
//     putInStoreNewMessageForCurrentDialog2
//   );
}