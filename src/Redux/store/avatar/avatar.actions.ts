import { Action } from "../interfaces/action.interface"
import { User } from "../../interfaces/user.interface"

export const ActionTypes = {
  GET_AVATAR: "[avatar] Get avatar",
  SET_AVATAR: "[avatar] Set avatar",
  DELETE_AVATAR: "[avatar] Delete_avatar",
  GET_FAILURE: "[getFailure] Get failure",
}

export const getAvatarAction = (
  avatar: {},
  userOwnerThisPage: User,
  userLogin: User,
  avatarForFront: {}
): Action<any> => ({
  type: ActionTypes.GET_AVATAR,
  payload: {
    avatar,
    userOwnerThisPage,
    userLogin,
    avatarForFront,
  },
})

export const getFailureAction = (error?: any): Action<any> => ({
  type: ActionTypes.GET_FAILURE,
  payload: error,
})
