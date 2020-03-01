import { combineReducers } from "redux"
import { reducer as userReducer } from "./userLogin/userLogin.reducer"
import { userOwnerThisPageReducer } from "./userOwnerThisPage/userOwnerThisPage.reducer"

export default combineReducers({
  common: userReducer,
  userOwnerThisPage:  userOwnerThisPageReducer
})
