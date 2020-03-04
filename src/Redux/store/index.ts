import { combineReducers } from "redux"
import { reducer as userReducer } from "./userLogin/userLogin.reducer"
import { userOwnerThisPageReducer } from "./userOwnerThisPage/userOwnerThisPage.reducer"
import { allUserReducer } from "./allUsers/allUsers.reducer"
import { currentDialogReducer } from "./currentDialog/currentDialog.reducer"

export default combineReducers({
  common: userReducer,
  userOwnerThisPage: userOwnerThisPageReducer,
  allUsers: allUserReducer,
  currentDialog: currentDialogReducer
})
