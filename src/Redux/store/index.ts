import { combineReducers } from "redux"
import { userOwnerThisPageReducerForSagas } from "./userOwnerThisPage/userOwnerThisPage.reducer"
import { reducer as userReducer } from "./userLogin/userLogin.reducer"
import { userOwnerThisPageReducer } from "./userOwnerThisPage/userOwnerThisPage.reducer"
import { allUserReducer } from "./allUsers/allUsers.reducer"
import { currentDialogReducer } from "./currentDialog/currentDialog.reducer"
import { listMessagesForCurrentDialogReducer } from "./listMessagesForCurrentDialog/listMessagesForCurrentDialog.reducer"
import { paginationReducer } from "./pagination/pagination.reducer"
import { checkBoxStateReducer } from "./checkBoxState/checkBoxState.reducer"
import { searchStringStateReducer } from "./searchStringState/searchStringState.reducer"
import { loadingStateReducer } from "./loading/loading.reducer"

export default combineReducers({
  common: userReducer,
  userOwnerThisPage: userOwnerThisPageReducer,
  userOwnerThisPageReducerForSagas: userOwnerThisPageReducerForSagas,
  allUsers: allUserReducer,
  currentDialog: currentDialogReducer,
  listMessagesForCurrentDialog: listMessagesForCurrentDialogReducer,
  pagination: paginationReducer,
  checkBoxState: checkBoxStateReducer,
  searchStringState: searchStringStateReducer,
  loadingState: loadingStateReducer
})
