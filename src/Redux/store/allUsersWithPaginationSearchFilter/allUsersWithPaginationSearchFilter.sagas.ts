import { put, takeEvery } from "redux-saga/effects"
import Service from "../../../services/service-user"
import {
  ActionTypes,
  setAllUsersWithPaginationSearchFilterAction,
  getFailureAction
} from "./allUsersWithPaginationSearchFilter.actions"

function* setAllUsersWithPaginationSearchFilter(actions: any) {
  try {
    const list = yield Service.getUserAfterPaginationAndSearchAndFilter(
      actions.payload
    )

    yield put(setAllUsersWithPaginationSearchFilterAction(list))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

export default function* putInStoreAllUsersSaga() {
  yield takeEvery(
    ActionTypes.GET_ALL_USERS_WITH_PAGINATION_SEARCH_FILTER,
    setAllUsersWithPaginationSearchFilter
  )
}
