import { ActionTypes } from "./loading.actions"
import { Action } from "../interfaces/action.interface"

export interface State {
    loadingState: String
}

const initialState: State = {
    loadingState: 'loaded'
}

export const loadingStateReducer = (state: State = initialState, action: Action<String>) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING_STATE:
      return {
        ...state,
        loadingState: action.payload
      }    
    default:
      return state
  }
}
