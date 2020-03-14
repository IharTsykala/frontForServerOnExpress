import { Action } from "../interfaces/action.interface"
import { SearchStringState } from "../../interfaces/searchStringState.interface"

export const ActionTypes = {
  SET_INITIAL_SEARCH_STRING_STATE:
    "[setInitialSearchStringState] set initial search string state",
  CHANGE_SEARCH_STRING_STATE:
    "[changeSearchStringState] change search string state"
}

export const setInitialSearchStringStateAction = (
  searchStringState: SearchStringState
): Action<SearchStringState> => ({
  type: ActionTypes.SET_INITIAL_SEARCH_STRING_STATE,
  payload: searchStringState
})

export const changeSearchStringStateAction = (
  searchStringState: SearchStringState
): Action<SearchStringState> => ({
  type: ActionTypes.CHANGE_SEARCH_STRING_STATE,
  payload: searchStringState
})
