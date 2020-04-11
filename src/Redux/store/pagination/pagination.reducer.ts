import { ActionTypes } from "./pagination.actions"
import { Action } from "../interfaces/action.interface"
import { Pagination } from "../../interfaces/pagination.interface"
import { checkBoxInterface } from "../../interfaces/checkBox.interface"

export interface State {
  searchString: string
  checkBox: checkBoxInterface
  pagination: Pagination
}

const initialState: State = {
  searchString: '',
  checkBox: {checkBoxState: false, prevCheckBoxState: undefined},
  pagination: { numberPage: 1, limitUsersForRender: 0 }
}

export const paginationReducer = (
  state: State = initialState,
  action: Action<{}>
) => {
  switch (action.type) {
  //  searchString
  case ActionTypes.SET_INITIAL_SEARCH_STRING_STATE:
    return {
      ...state,
      searchString: initialState.searchString
    }
  case ActionTypes.SET_CURRENT_SEARCH_STRING_STATE:
    return {
      ...state,
      searchString: action.payload
    }

  //checkBox
  case ActionTypes.SET_CHECK_BOX_STATE:
    return {
      ...state,
      checkBox: {...state.checkBox, checkBoxState: action.payload}
    }
  case ActionTypes.CHANGE_CHECK_BOX_STATE:
    return {
      ...state,
      checkBox: {...state.checkBox, checkBoxState: !state.checkBox.checkBoxState}
    }
  case ActionTypes.SET_PREV_CHECK_BOX_STATE:
    return {
      ...state,
      checkBox: {...state.checkBox, prevCheckBoxState: action.payload}
    }

  //pagination
  case ActionTypes.PAGINATION_SET_VALUES:
    return {
      ...state,
      pagination: action.payload
    }
  // case ActionTypes.PAGINATION_SET_NUMBER_PAGE:
  //   return {
  //     ...state,
  //     pagination: action.payload
  //   }
  // case ActionTypes.PAGINATION_SET_LIMIT_USERS_FOR_RENDER:
  //   return {
  //     ...state,
  //     pagination: action.payload
  //   }
  // case ActionTypes.PAGINATION_SET_INITIAL_VALUE:
  //   return {
  //     ...state,
  //     pagination: initialState.pagination
  //   }
  default:
    return state
  }
}
