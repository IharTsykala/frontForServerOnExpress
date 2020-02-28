import { Action } from "../interfaces/action.interface"
import { User } from "./../../interfaces/user.interface"
export const ActionTypes = {
  GET_LIST_ALBUMS: "[getListAlbums] get list albums"
}

export const userLogIn = (user: User): Action<User> => ({
  type: ActionTypes.GET_LIST_ALBUMS  
})


