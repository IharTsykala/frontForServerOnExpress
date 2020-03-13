import { call, put, takeEvery } from "redux-saga/effects"
import Service from "../../../services/service-user"
import {
  ActionTypes,
  setUserOwnerThisPageActionForSagas,
  getFailureAction
} from "./userOwnerThisPage.actions"

function* setUserOwnerThisPage(actions: any) {
  try {
    const userOwnerThisPage = yield call(Service.getUserByID, actions.payload)
    yield put(setUserOwnerThisPageActionForSagas(userOwnerThisPage))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

export default function* getUserOwnerThisPageForSaga() {
  yield takeEvery(
    ActionTypes.GET_USER_OWNER_THIS_PAGE_FOR_SAGAS,
    setUserOwnerThisPage
  )
}
