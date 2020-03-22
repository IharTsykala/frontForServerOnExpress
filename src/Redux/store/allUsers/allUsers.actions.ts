import { Action } from "../interfaces/action.interface"
import { User } from "../../interfaces/user.interface"
import { BodyForPagination } from "../../interfaces/bodyForPagination.interface"

export const ActionTypes = {
  ALL_USERS: "[allUsers] all users",

  GET_ALL_USERS_FOR_SAGAS: "[getAllUsersForSagas] get all users for sagas",
  PUT_ALL_USERS_IN_STATE: "[putAllUsersInState] put all users in state",

  GET_ALL_USERS_WITH_PAGINATION_SEARCH_FILTER:
    "[getAllUsersWithPaginationSearchFilter] get all users with pagination search filter",
  SET_ALL_USERS_WITH_PAGINATION_SEARCH_FILTER:
    "[setAllUsersWithPaginationSearchFilter] set all users with pagination search filter",
  GET_ALL_FRIENDS_BY_USER_ID:
    "[User] get all friends by userId",
  SET_ALL_FRIENDS_FOR_USER:
    "[User] set all friend for user",

  GET_FAILURE: "[getFailureAction] get failure action"
}

export const AllUsersAction = (allUsers: []): Action<[]> => ({
  type: ActionTypes.ALL_USERS,
  payload: allUsers
})

export const getAllUsersForSagasAction = (userId: String): Action<String> => ({
  type: ActionTypes.GET_ALL_USERS_FOR_SAGAS,
  payload: userId
})

export const putAllUsersInStateAction = (allUsers: [User]): Action<any> => ({
  type: ActionTypes.PUT_ALL_USERS_IN_STATE,
  payload: allUsers
})

export const getAllUsersWithPaginationSearchFilterAction = (
  bodyForPagination: BodyForPagination
): Action<BodyForPagination> => ({
  type: ActionTypes.GET_ALL_USERS_WITH_PAGINATION_SEARCH_FILTER,
  payload: bodyForPagination
})

export const setAllUsersWithPaginationSearchFilterAction = (
  allUsers: [User]
): Action<any> => ({
  type: ActionTypes.SET_ALL_USERS_WITH_PAGINATION_SEARCH_FILTER,
  payload: allUsers
})

export const getFriendsByUserIdAction = (userId: String): Action<String> => ({
  type: ActionTypes.GET_ALL_FRIENDS_BY_USER_ID,
  payload: userId
})

export const setFriendsForUserAction = (allFriends: [User]): Action<[User]> => ({
  type: ActionTypes.SET_ALL_FRIENDS_FOR_USER,
  payload: allFriends
})

export const getFailureAction = (error?: any): Action<any> => ({
  type: ActionTypes.GET_FAILURE,
  payload: error
})
