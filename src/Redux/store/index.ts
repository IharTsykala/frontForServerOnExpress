import { combineReducers } from "redux"
// import { userOwnerThisPageReducerForSagas } from "./userOwnerThisPage/userOwnerThisPage.reducer"
// import { reducer as userReducer2 } from "./userLogin/userLogin.reducer"
// import { userOwnerThisPageReducer } from "./userOwnerThisPage/userOwnerThisPage.reducer"
// import { allUserReducer } from "./allUsers/allUsers.reducer"
import { dialogReducer } from "./dialogs/dialogs.reducer"
import { listMessagesForCurrentDialogReducer } from "./listMessagesForCurrentDialog/listMessagesForCurrentDialog.reducer"
import { paginationReducer } from "./pagination/pagination.reducer"
// import { checkBoxStateReducer } from "./checkBoxState/checkBoxState.reducer"
// import { searchStringStateReducer } from "./searchStringState/searchStringState.reducer"
import { loadingStateReducer } from "./loading/loading.reducer"
import { albumsReducer } from "./albums/albums.reducer"
import { userReducer } from "./user/user.reducer"

export default combineReducers({
  // common: userReducer2,
  // userOwnerThisPage: userOwnerThisPageReducer,
  // userOwnerThisPageForSagas: userOwnerThisPageReducerForSagas,
  // allUsers: allUserReducer,
  dialog: dialogReducer,
  listMessagesForCurrentDialog: listMessagesForCurrentDialogReducer,
  pagination: paginationReducer,
  // checkBoxState: checkBoxStateReducer,
  // searchStringState: searchStringStateReducer,
  loadingState: loadingStateReducer,
  albumsState: albumsReducer,
  user: userReducer,
})
