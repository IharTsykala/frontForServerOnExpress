import { Action } from "../../actionsInterface/action.interface"
import { Pagination } from "../../entitiesInterface/pagination.interface"
// import { UserLogOut } from "../../entitiesInterface/userLogOut.interface"

export const ActionTypes = {
  // SearchString
  SET_INITIAL_SEARCH_STRING_STATE:
    "[pagination] set initial search string state",
  SET_CURRENT_SEARCH_STRING_STATE:
    "[pagination] set current search string state",

  //CheckBox
  SET_CHECK_BOX_STATE: "[pagination] set check box state",
  CHANGE_CHECK_BOX_STATE: "[pagination] change check box state",
  SET_PREV_CHECK_BOX_STATE: "[pagination] set prev check box state",

  // oldActions
  PAGINATION_SET_VALUES:
    "[setValuesForPaginationAction] set values for pagination action",
  PAGINATION_SET_NUMBER_PAGE: "[setNumberPage] set number page",
  PAGINATION_SET_LIMIT_USERS_FOR_RENDER:
    "[setLimitUsersForRender] set limit users for render",
  PAGINATION_SET_INITIAL_VALUE:
    "[setInitialValueForPagination] set initial value for pagination",
}

// SearchString
export const setInitialSearchStringStateAction = (): Action<""> => ({
  type: ActionTypes.SET_INITIAL_SEARCH_STRING_STATE,
})

export const setCurrentSearchStringState = (
  searchStringState: String
): Action<String> => ({
  type: ActionTypes.SET_CURRENT_SEARCH_STRING_STATE,
  payload: searchStringState,
})

//CheckBox
export const setCheckBoxStateAction = (
  checkBoxState: boolean
): Action<boolean> => ({
  type: ActionTypes.SET_CHECK_BOX_STATE,
  payload: checkBoxState,
})

export const changeCheckBoxStateAction = (): Action<boolean> => ({
  type: ActionTypes.CHANGE_CHECK_BOX_STATE,
})

export const setPrevCheckBoxStateAction = (
  checkBoxState: boolean
): Action<boolean> => ({
  type: ActionTypes.SET_PREV_CHECK_BOX_STATE,
  payload: checkBoxState,
})

// oldActions
export const setValuesForPaginationAction = (
  pagination: Pagination
): Action<Pagination> => ({
  type: ActionTypes.PAGINATION_SET_VALUES,
  payload: pagination,
})

// export const setNumberPageAction = (
//   pagination: Pagination
// ): Action<Pagination> => ({
//   type: ActionTypes.PAGINATION_SET_NUMBER_PAGE,
//   payload: pagination,
// })

// export const setLimitUsersForRenderAction = (
//   pagination: Pagination
// ): Action<Pagination> => ({
//   type: ActionTypes.PAGINATION_SET_LIMIT_USERS_FOR_RENDER,
//   payload: pagination,
// })

// export const setInitialValueForPaginationAction = (): Action<Pagination> => ({
//   type: ActionTypes.PAGINATION_SET_INITIAL_VALUE,
// })
