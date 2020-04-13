import { combineReducers } from "redux"
import { dialogReducer } from "./dialogs/dialogs.reducer"
import { paginationReducer } from "./pagination/pagination.reducer"
import { loadingStateReducer } from "./loading/loading.reducer"
import { albumsReducer } from "./albums/albums.reducer"
import { userReducer } from "./user/user.reducer"

export default combineReducers({
  dialog: dialogReducer,
  pagination: paginationReducer,
  loadingState: loadingStateReducer,
  albumsState: albumsReducer,
  user: userReducer,
})
