const axios = require("axios")

export default class ServiceSubscriptions {
  static interceptor = axios.interceptors.request.use(
    function (config: any) {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    function (error: string) {
      return Promise.reject(error)
    }
  )

  static getStatusUsersSubscribeByID = async (idLogInUser: string) => {
    const response = await axios.get(
      `http://localhost:8080/subscriptions/getStatusUsersSubscribeByID/${idLogInUser}`
    )
    return response.data
  }

  static getAllObservables = async (idLogInUser: string) => {
    const response = await axios.get(
      `http://localhost:8080/subscriptions/withObservables/${idLogInUser}`
    )
    return response.data
  }

  static addSubscribe = async (idLogInUser: any, IdObserversUser: string) => {
    const subscribe = {
      requestSubscriberId: idLogInUser,
      responseSubscriberId: IdObserversUser,
    }
    await axios.post(`http://localhost:8080/subscriptions/add`, subscribe)
  }

  static deleteSubscribe = async (
    idLogInUser: any,
    IdObserversUser: string
  ) => {
    await axios.delete(
      `http://localhost:8080/subscriptions/deleteSubscribe/?idLogInUser=${idLogInUser}&IdObserversUser=${IdObserversUser}`
    )
  }

  static deleteSubscribeAfterAddFriend = async (
    IdObserversUser: string,
    idLogInUser: any
  ) => {
    await axios.delete(
      `http://localhost:8080/subscriptions/deleteSubscribeAfterAddFriend/?IdObserversUser=${IdObserversUser}&idLogInUser=${idLogInUser}`
    )
  }
}
