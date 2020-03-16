import { Action } from "../interfaces/action.interface"
import { User } from "../../interfaces/user.interface"
import { BodyForPagination } from "../../interfaces/bodyForPagination.interface"

export const ActionTypes = {
  GET_ALL_USERS_WITH_PAGINATION_SEARCH_FILTER:
    "[getAllUsersWithPaginationSearchFilter] get all users with pagination search filter",
  SET_ALL_USERS_WITH_PAGINATION_SEARCH_FILTER:
    "[setAllUsersWithPaginationSearchFilter] set all users with pagination search filter",
  GET_FAILURE: "[getFailureAction] get failure action"
}

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

export const getFailureAction = (error?: any): Action<any> => ({
  type: ActionTypes.GET_FAILURE,
  payload: error
})
