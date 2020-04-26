import { put, takeEvery } from "redux-saga/effects"
import Service from "../../../services/service-user"
import ServiceAlbums from "../../../services/service-album"
import ServicePhotos from "../../../services/service-photo"
import { LoadingState } from "../../../shared/constants/user-from-view-mode.enum"
import { setLoadingStatePhotosInCurrentAlbumAction } from "../loading/loading.actions"

import {
  ActionTypes,
  getListAlbumsWithPhotosByUserIDAction,
  setListAlbumsWithPhotosInStoreAction,
  setListPhotosForCurrentAlbumAction,
  getListPhotosByAlbumIdAction,
  setListPhotosForUserAction,
  getFailureAction,
} from "./albums.action"

import { getUserOwnerThisPage } from "../user/user.actions"

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
    yield ServiceAlbums.removeHandler(actions.payload.albumId)
    yield put(getListAlbumsWithPhotosByUserIDAction(actions.payload.userId))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

function* addAlbumByUserId(actions: any) {
  try {
    const data = yield ServiceAlbums.addAlbum(actions.payload.userId)
    yield ServicePhotos.addPhotosIntoFsAndAlbum(
      actions.payload.userId,
      data.album._id,
      actions.payload.arrayPhotos
    )
    yield put(getListAlbumsWithPhotosByUserIDAction(actions.payload.userId))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

function* setListPhotosForCurrentAlbum(actions: any) {
  try {
    yield put(setLoadingStatePhotosInCurrentAlbumAction(LoadingState.Loading))
    const arrayAlbums = yield ServiceAlbums.getListPhotosByAlbumID(
      actions.payload
    )
    if (arrayAlbums.length) {
      yield put(getUserOwnerThisPage(arrayAlbums[0].ownerUser))
      yield put(setListPhotosForCurrentAlbumAction(arrayAlbums[0].photos))
      yield put(setLoadingStatePhotosInCurrentAlbumAction(LoadingState.Loaded))
    } else {
      yield put(
        setLoadingStatePhotosInCurrentAlbumAction(LoadingState.NotFound)
      )
    }
  } catch (e) {
    yield put(setLoadingStatePhotosInCurrentAlbumAction(LoadingState.Error))
    yield put(getFailureAction(e))
  }
}

function* addPhotosInCurrentAlbum(actions: any) {
  try {
    yield ServicePhotos.addPhotosIntoFsAndAlbum(
      actions.payload.userOwnerThisPageId,
      actions.payload.albumId,
      actions.payload.arrayPhotos
    )
    yield put(getListPhotosByAlbumIdAction(actions.payload.albumId))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

function* removePhotoFromCurrentAlbum(actions: any) {
  try {
    yield ServicePhotos.removeHandler(actions.payload.photoId)
    yield put(getListPhotosByAlbumIdAction(actions.payload.albumId))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

function* setListPhotosForUser(actions: any) {
  try {
    const arrayPhotos = yield ServicePhotos.getPhotosById(actions.payload)
    yield put(setListPhotosForUserAction(arrayPhotos.data))
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
  yield takeEvery(
    ActionTypes.GET_LIST_PHOTOS_BY_ALBUM_ID,
    setListPhotosForCurrentAlbum
  )
  yield takeEvery(
    ActionTypes.ADD_PHOTOS_IN_CURRENT_ALBUM,
    addPhotosInCurrentAlbum
  )
  yield takeEvery(
    ActionTypes.REMOVE_PHOTO_FROM_CURRENT_ALBUM,
    removePhotoFromCurrentAlbum
  )
  yield takeEvery(ActionTypes.GET_LIST_PHOTOS_BY_USER_ID, setListPhotosForUser)
}
