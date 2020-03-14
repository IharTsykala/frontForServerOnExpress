import { ActionTypes } from "./searchStringState.actions"
import { Action } from "../interfaces/action.interface"

export interface State {
  searchStringState: ""|String
}

const initialState: State = {
  searchStringState: ""
}

export const searchStringStateReducer = (
  state: State = initialState,
  action: Action<{}>
) => {
  switch (action.type) {
    case ActionTypes.SET_INITIAL_SEARCH_STRING_STATE:
      return {
        ...state,
        searchStringState: initialState
      }
    case ActionTypes.CHANGE_SEARCH_STRING_STATE:
      return {
        ...state,
        searchStringState: action.payload
      }
    default:
      return state
  }
}
