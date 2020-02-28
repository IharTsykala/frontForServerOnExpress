import { Action } from "../interfaces/action.interface"
import { UserOwnerPage } from "../../interfaces/userOwnerPage.interface"
export const ActionTypes = {
  USER_OWNER_PAGE: "[userOwnerPage] User owner page"
}

export const userOwnerPage = (user: UserOwnerPage): Action<UserOwnerPage> => ({
  type: ActionTypes.USER_OWNER_PAGE,
  payload: user
})
