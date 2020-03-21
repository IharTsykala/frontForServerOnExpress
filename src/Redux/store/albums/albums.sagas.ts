import { put, takeEvery } from "redux-saga/effects"
import Service from "../../../services/service-user"
import ServiceAlbum from "../../../services/service-album"
import ServicePhoto from "../../../services/service-photo"

import {
  ActionTypes,
  getListAlbumsWithPhotosByUserIDAction,
  setListAlbumsWithPhotosInStoreAction,
  getFailureAction
} from "./albums.action"

function* setListAlbumsWithPhotosInStore(actions: any) {
  try {
    const listAlbums = yield Service.getListAlbumsWithPhotosByUserID(
      actions.payload
    )
    yield put(setListAlbumsWithPhotosInStoreAction(listAlbums))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

function* removeAlbum(actions: any) {
  try {
    yield ServiceAlbum.removeHandler(actions.payload.albumId)
    yield put(getListAlbumsWithPhotosByUserIDAction(actions.payload.userId))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

function* addAlbumByUserId(actions: any) {
  try {
    const data = yield ServiceAlbum.addAlbum(actions.payload.userId)
    const idAlbum = yield data.album._id
    yield ServicePhoto.addPhotosIntoFsAndAlbum(
      actions.payload.userId,
      idAlbum,
      actions.payload.arrayPhotos
    )
    yield put(getListAlbumsWithPhotosByUserIDAction(actions.payload.userId))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

export default function* albumsSaga() {
  yield takeEvery(
    ActionTypes.GET_LIST_ALBUMS_WITH_PHOTOS,
    setListAlbumsWithPhotosInStore
  )
  yield takeEvery(ActionTypes.REMOVE_ALBUM, removeAlbum)
  yield takeEvery(ActionTypes.ADD_ALBUM, addAlbumByUserId)
}
