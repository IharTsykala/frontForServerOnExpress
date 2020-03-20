import { Action } from "../interfaces/action.interface"
import { User } from "../../interfaces/user.interface"
export interface State {
  user: User
}

const initialState: State = {
  user: {} as User
}

export const reducer = (state: State = initialState, action: Action<{}>) => {
  switch (action.type) {
     
    default:
      return state
  }
}