import { Album } from "../../interfaces/album.interface"
import { ActionTypes } from "./albums.action"
import { Action } from "../interfaces/action.interface"
import { Photo } from "../../interfaces/photo.interface"

export interface State {
  albumsForUserOwnerPage: [Album]
  currentAlbum: [Photo]
  allPhotosForThisUser: [Photo]
}

const initialState: State = {
  albumsForUserOwnerPage: [{} as Album],
  currentAlbum: [{} as Photo],
  allPhotosForThisUser: [{} as Photo]
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
    case ActionTypes.SET_LIST_PHOTOS_FOR_CURRENT_ALBUM:
      return {
        ...state,
        currentAlbum: action.payload
      }
      case ActionTypes.SET_LIST_PHOTOS_FOR_USER:
      return {
        ...state,
        allPhotosForThisUser: action.payload
      }
    default:
      return state
  }
}