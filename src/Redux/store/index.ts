import { combineReducers } from "redux"
import { reducer as userReducer } from "./userLogin/userLogin.reducer"
import { userOwnerThisPageReducer } from "./userOwnerThisPage/userOwnerThisPage.reducer"
import { allUserReducer } from "./allUsers/allUsers.reducer"
import { currentDialogReducer } from "./currentDialog/currentDialog.reducer"
import { listMessagesForCurrentDialogReducer } from "./listMessagesForCurrentDialog/listMessagesForCurrentDialog.reducer"

export default combineReducers({
  common: userReducer,
  userOwnerThisPage: userOwnerThisPageReducer,
  allUsers: allUserReducer,
  currentDialog: currentDialogReducer,
  listMessagesForCurrentDialog: listMessagesForCurrentDialogReducer
})
