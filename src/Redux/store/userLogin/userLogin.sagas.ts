import { put, takeEvery } from "redux-saga/effects"
import Service from "../../../services/service-user"
import { LoadingState } from "../../../shared/constants/user-from-view-mode.enum"
import {setLoadingState} from '../loading/loading.actions'

import {
    ActionTypes,
    setUserLoginInStoreAction, 
    userLogOutAction,
    getFailureAction
  } from "./userLogin.actions"

  function* setUserLoginInStore() {
    try {       
      yield put(setLoadingState(LoadingState.loading))       
      const userLog = yield Service.getUserByToken()      
      if(userLog._id) {
        yield put(setUserLoginInStoreAction(userLog))
        yield put(setLoadingState(LoadingState.loaded))
      } else {
        yield put(setLoadingState(LoadingState.notFound))
      }  
    } catch (e) {
      yield put(setLoadingState(LoadingState.error))
      yield put(getFailureAction(e))
    }
  }

  function* setUserLogoutInStore(actions:any) {
    try {       
      yield Service.logOutAllDevices(actions.userId, actions.user)
      yield put(userLogOutAction())
      yield localStorage.removeItem("token")
    } catch (e) {    
      yield put(getFailureAction(e))
    }
  }

  export default function* userLoginSaga() {
    yield takeEvery(
      ActionTypes.GET_USER_LOGIN_FOR_SAGA,    
      setUserLoginInStore
    ); 
    yield takeEvery(
      ActionTypes.GET_USER_FOR_LOGOUT,    
      setUserLogoutInStore
    );  
  }