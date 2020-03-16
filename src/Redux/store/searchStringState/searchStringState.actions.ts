import { Action } from "../interfaces/action.interface"

export const ActionTypes = {
  SET_INITIAL_SEARCH_STRING_STATE:
    "[setInitialSearchStringState] set initial search string state",
  SET_CURRENT_SEARCH_STRING_STATE:
    "[setCurrentSearchStringState] set current search string state"
}

export const setInitialSearchStringStateAction = (): Action<""> => ({
  type: ActionTypes.SET_INITIAL_SEARCH_STRING_STATE
})

export const setCurrentSearchStringState = (
  searchStringState: String
): Action<String> => ({
  type: ActionTypes.SET_CURRENT_SEARCH_STRING_STATE,
  payload: searchStringState
})
