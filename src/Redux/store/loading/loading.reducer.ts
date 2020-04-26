import { ActionTypes } from "./loading.actions"
import { Action } from "../../actionsInterface/action.interface"

export interface State {
  loadingState: string
  loadingStatePhotosInCurrentAlbum: string
  loadingStateForNavbar: string
}

const initialState: State = {
  loadingState: "loaded",
  loadingStatePhotosInCurrentAlbum: "loaded",
  loadingStateForNavbar: "loaded",
}

export const loadingStateReducer = (
  state: State = initialState,
  action: Action<String>
) => {
  switch (action.type) {
  case ActionTypes.SET_LOADING_STATE:
    return { ...state, loadingState: action.payload }
  case ActionTypes.SET_LOADING_STATE_PHOTOS_IN_ALBUM:
    return { ...state, loadingStatePhotosInCurrentAlbum: action.payload }
  case ActionTypes.SET_LOADING_STATE_FOR_NAVBAR:
    return { ...state, loadingStateForNavbar: action.payload }
  default:
    return state
  }
}
