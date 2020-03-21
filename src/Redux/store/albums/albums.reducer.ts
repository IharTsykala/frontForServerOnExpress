import { Album } from "../../interfaces/album.interface"
import { ActionTypes } from "./albums.action"
import { Action } from "../interfaces/action.interface"

export interface State {
  albumsForUserOwnerPage: [Album]
}

const initialState: State = {
  albumsForUserOwnerPage: [{} as Album]
}

export const albumsReducer = (
  state: State = initialState,
  action: Action<[any]>
) => {
  switch (action.type) {
    case ActionTypes.SET_LIST_ALBUMS_WITH_PHOTOS:
      return {
        ...state,
        albumsForUserOwnerPage: action.payload
      }
    //   case ActionTypes.SET_ALL_DIALOGS_BY_USER_ID:
    //   return {
    //     ...state,
    //     allDialogs: action.payload
    //   }
    default:
      return state
  }
}
