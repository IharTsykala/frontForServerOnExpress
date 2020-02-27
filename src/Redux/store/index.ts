import { combineReducers } from "redux"
import { reducer as userReducer } from "./user/user.reducer"

//Задаём базовую структуру стора, объединяем (здесь можем объединять) все редьюсеры, которые есть в приложении
export default combineReducers({
  common: userReducer
})
