import { Action } from "../interfaces/action.interface"
import { UserOwnerThisPageInterface } from "../../interfaces/userOwnerThisPage.interface"
export const ActionTypes = {
  USER_OWNER_THIS_PAGE: "[userOwnerThisPage] User owner this page",
  GET_USER_OWNER_THIS_PAGE_FOR_SAGAS:
    "[getUserOwnerThisPageActionForSagas] get user owner this page for sagas",
  SET_USER_OWNER_THIS_PAGE_FOR_SAGAS:
    "[setUserOwnerThisPageActionForSagas] set user owner this page for sagas",
  GET_FAILURE: "[getFailure] get failure"
}

export const userOwnerThisPageAction = (
  userOwnerThisPage: UserOwnerThisPageInterface
): Action<UserOwnerThisPageInterface> => ({
  type: ActionTypes.USER_OWNER_THIS_PAGE,
  payload: userOwnerThisPage
})

export const getUserOwnerThisPageActionForSagas = (
  userOwnerThisPage: UserOwnerThisPageInterface
): Action<UserOwnerThisPageInterface> => ({
  type: ActionTypes.GET_USER_OWNER_THIS_PAGE_FOR_SAGAS,
  payload: userOwnerThisPage
})

export const setUserOwnerThisPageActionForSagas = (
  userOwnerThisPage: UserOwnerThisPageInterface
): Action<UserOwnerThisPageInterface> => ({
  type: ActionTypes.SET_USER_OWNER_THIS_PAGE_FOR_SAGAS,
  payload: userOwnerThisPage
})

export const getFailureAction = (error?: any): Action<any> => ({
  type: ActionTypes.GET_FAILURE,
  payload: error
})
