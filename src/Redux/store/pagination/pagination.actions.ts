import { Action } from "../interfaces/action.interface"
import { Pagination } from "../../interfaces/pagination.interface"
// import { UserLogOut } from "../../interfaces/userLogOut.interface"

export const ActionTypes = {
  PAGINATION_SET_VALUES:
    "[setValuesForPaginationAction] set values for pagination action",
  PAGINATION_SET_NUMBER_PAGE: "[setNumberPage] set number page",
  PAGINATION_SET_LIMIT_USERS_FOR_RENDER:
    "[setLimitUsersForRender] set limit users for render",
  PAGINATION_SET_INITIAL_VALUE:
    "[setInitialValueForPagination] set initial value for pagination"
}

export const setValuesForPaginationAction = (
  pagination: Pagination
): Action<Pagination> => ({
  type: ActionTypes.PAGINATION_SET_VALUES,
  payload: pagination
})

export const setNumberPageAction = (
  pagination: Pagination
): Action<Pagination> => ({
  type: ActionTypes.PAGINATION_SET_NUMBER_PAGE,
  payload: pagination
})

export const setLimitUsersForRenderAction = (
  pagination: Pagination
): Action<Pagination> => ({
  type: ActionTypes.PAGINATION_SET_LIMIT_USERS_FOR_RENDER,
  payload: pagination
})

export const setInitialValueForPaginationAction = (): Action<Pagination> => ({
  type: ActionTypes.PAGINATION_SET_INITIAL_VALUE
})
