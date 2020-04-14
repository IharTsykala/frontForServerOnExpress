import { Action } from "../../actionsInterface/action.interface"
// import { LoadingState } from "../../entitiesInterface/loading.entitiesInterface"

export const ActionTypes = {
  SET_LOADING_STATE: "[loading] set loading state",
  SET_LOADING_STATE_PHOTOS_IN_ALBUM:
    "[loading] set loading state photos in current album",

  SET_LOADING_STATE_FOR_NAVBAR: "[loading] set loading state for navbar",
}

export const setLoadingState = (loadingState: string): Action<string> => ({
  type: ActionTypes.SET_LOADING_STATE,
  payload: loadingState,
})

export const setLoadingStatePhotosInCurrentAlbumAction = (
  loadingState: string
): Action<string> => ({
  type: ActionTypes.SET_LOADING_STATE_PHOTOS_IN_ALBUM,
  payload: loadingState,
})

export const loadingStateForNavbar = (
  loadingState: string
): Action<string> => ({
  type: ActionTypes.SET_LOADING_STATE_FOR_NAVBAR,
  payload: loadingState,
})
