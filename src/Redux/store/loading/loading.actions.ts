import { Action } from "../interfaces/action.interface"
// import { LoadingState } from "../../interfaces/loading.interfaces"

export const ActionTypes = {
  SET_LOADING_STATE: "[loading state] Set loading state"
}

export const setLoadingState = (loadingState: String): Action<String> => ({
  type: ActionTypes.SET_LOADING_STATE,
  payload: loadingState
})
