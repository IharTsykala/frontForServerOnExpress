const axios = require("axios")

export default class ServiceSubscriptions {
  static interceptor = axios.interceptors.request.use(
    function(config: any) {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    function(error: string) {
      return Promise.reject(error)
    }
  )

  static getStatusUsersSubscribeByID = async (idLogInUser: string) => {
    const response = await axios.get(
      `https://strawberry-tart-41911.herokuapp.com/subscriptions/getStatusUsersSubscribeByID/${idLogInUser}`
    )
    return response.data
  }

  static getAllObservables = async (idLogInUser: string) => {
    const response = await axios.get(
      `https://strawberry-tart-41911.herokuapp.com/subscriptions/withObservables/${idLogInUser}`
    )
    return response.data
  }

  static addSubscribe = async (idLogInUser: any, IdObserversUser: string) => {
    const subscribe = {
      requestSubscriberId: idLogInUser,
      responseSubscriberId: IdObserversUser
    }
    await axios.post(
      `https://strawberry-tart-41911.herokuapp.com/subscriptions/add`,
      subscribe
    )
  }

  static deleteSubscribe = async (
    idLogInUser: any,
    IdObserversUser: string
  ) => {
    await axios.delete(
      `https://strawberry-tart-41911.herokuapp.com/subscriptions/deleteSubscribe/?idLogInUser=${idLogInUser}&IdObserversUser=${IdObserversUser}`
    )
  }

  static deleteSubscribeAfterAddFriend = async (
    IdObserversUser: string,
    idLogInUser: any
  ) => {
    await axios.delete(
      `https://strawberry-tart-41911.herokuapp.com/subscriptions/deleteSubscribeAfterAddFriend/?IdObserversUser=${IdObserversUser}&idLogInUser=${idLogInUser}`
    )
  }
}
