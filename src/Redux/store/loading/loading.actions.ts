import { Action } from "../interfaces/action.interface"
// import { LoadingState } from "../../interfaces/loading.interfaces"

export const ActionTypes = {
  SET_LOADING_STATE: "[loading state] Set loading state",
  SET_LOADING_STATE_PHOTOS_IN_ALBUM: "[loading state] Set loading state photos in current album"
}

export const setLoadingState = (loadingState: string): Action<string> => ({
  type: ActionTypes.SET_LOADING_STATE,
  payload: loadingState
})

export const setLoadingStatePhotosInCurrentAlbumAction = (loadingState: string): Action<string> => ({
  type: ActionTypes.SET_LOADING_STATE_PHOTOS_IN_ALBUM,
  payload: loadingState
})