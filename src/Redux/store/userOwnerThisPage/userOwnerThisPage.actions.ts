import { Action } from "../interfaces/action.interface"
import { UserOwnerThisPageInterface } from "../../interfaces/userOwnerThisPage.interface"
export const ActionTypes = {
  USER_OWNER_THIS_PAGE: "[userOwnerThisPage] User owner this page"
}

export const userOwnerThisPageAction = (
  userOwnerThisPage: UserOwnerThisPageInterface
): Action<UserOwnerThisPageInterface> => ({
  type: ActionTypes.USER_OWNER_THIS_PAGE,
  payload: userOwnerThisPage
})
