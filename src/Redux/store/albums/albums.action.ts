import { Action } from "../interfaces/action.interface"
import { Album } from "../../interfaces/album.interface"
import { Dialog } from "../../interfaces/dialog.interface"
export const ActionTypes = {
  GET_LIST_ALBUMS_WITH_PHOTOS: "[Album] Get list albums with photos by userId",
  SET_LIST_ALBUMS_WITH_PHOTOS: "[Album] Set list albums with photos in store",
  REMOVE_ALBUM: "[Album] remove album",
  ADD_ALBUM: "[Album] add album by userId",
  GET_FAILURE: "[getFailure] Get failure"
}

export const getListAlbumsWithPhotosByUserIDAction = (
  userId: string
): Action<string> => ({
  type: ActionTypes.GET_LIST_ALBUMS_WITH_PHOTOS,
  payload: userId
})

export const setListAlbumsWithPhotosInStoreAction = (
  albums: [Album]
): Action<[Album]> => ({
  type: ActionTypes.SET_LIST_ALBUMS_WITH_PHOTOS,
  payload: albums
})

export const removeAlbumAction = (
  albumId: string,
  userId: string
): Action<{}> => ({
  type: ActionTypes.REMOVE_ALBUM,
  payload: { albumId, userId }
})

export const addAlbumWithPhotosByUserIdAction = (
  userId: string,
  arrayPhotos: []
): Action<{}> => ({
  type: ActionTypes.ADD_ALBUM,
  payload: { userId, arrayPhotos }
})

export const getFailureAction = (error?: any): Action<any> => ({
  type: ActionTypes.GET_FAILURE,
  payload: error
})
