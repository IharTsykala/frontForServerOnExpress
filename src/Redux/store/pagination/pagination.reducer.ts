import { ActionTypes } from "./pagination.actions"
import { Action } from "../interfaces/action.interface"
import { Pagination } from "../../interfaces/pagination.interface"
export interface State {
  pagination: Pagination
}

const initialState: State = {
  pagination: { numberPage: 1, limitUsersForRender: 1 }
}

export const paginationReducer = (
  state: State = initialState,
  action: Action<{}>
) => {
  switch (action.type) {
    case ActionTypes.PAGINATION_SET_VALUES:
      return {
        ...state,
        pagination: action.payload
      }
    case ActionTypes.PAGINATION_SET_NUMBER_PAGE:
      return {
        ...state,
        pagination: action.payload
      }
    case ActionTypes.PAGINATION_SET_LIMIT_USERS_FOR_RENDER:
      return {
        ...state,
        pagination: action.payload
      }
    case ActionTypes.PAGINATION_SET_INITIAL_VALUE:
      return {
        ...state,
        pagination: initialState
      }
    default:
      return state
  }
}
