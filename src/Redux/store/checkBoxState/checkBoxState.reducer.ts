import { ActionTypes } from "./checkBoxState.actions"
import { Action } from "../interfaces/action.interface"
// import { CheckBoxState } from "../../interfaces/checkBoxState.interface"

export interface State {
  checkBoxState:  boolean
}

const initialState: State = {
  checkBoxState:  true
}


export const checkBoxStateReducer = (
  state: State = initialState,
  action: Action<{}>
) => {  
  switch (action.type) {
    case ActionTypes.SET_CHECK_BOX_STATE:
      return {
        ...state,
        checkBoxState: action.payload
      }
    case ActionTypes.CHANGE_CHECK_BOX_STATE:
      console.log(1)     
      // return {
      //   ...state,        
      //   checkBoxState: !state.checkBoxState
      // }
    default:
      return state
  }
}
