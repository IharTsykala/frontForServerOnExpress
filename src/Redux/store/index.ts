import { combineReducers } from "redux"
import { reducer as userReducer } from "./userLogin/userLogin.reducer"
import { userOwnerPage } from "./userOwnerPage/userOwnerPage.reducer"

export default combineReducers({
  common: userReducer,
  userOwnerPage:  userOwnerPage
})
