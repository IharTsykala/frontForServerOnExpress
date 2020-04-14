import { combineReducers } from "redux"
import { dialogReducer } from "./store/dialogs/dialogs.reducer"
import { paginationReducer } from "./store/pagination/pagination.reducer"
import { loadingStateReducer } from "./store/loading/loading.reducer"
import { albumsReducer } from "./store/albums/albums.reducer"
import { userReducer } from "./store/user/user.reducer"

export default combineReducers({
  dialog: dialogReducer,
  pagination: paginationReducer,
  loadingState: loadingStateReducer,
  albumsState: albumsReducer,
  user: userReducer,
})
