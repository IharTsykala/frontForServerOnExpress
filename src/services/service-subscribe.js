const axios = require("axios")

export default class ServiceSubscriptions {
  static interceptor = axios.interceptors.request.use(
    function(config) {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    function(error) {
      return Promise.reject(error)
    }
  )

  static getAllSubscribes = async idLogInUser => {
    const response = await axios.get(
      `http://localhost:8080/subscriptions/withSubscriptions/${idLogInUser}`
    )         
    return response.data
  }

  static getAllObservables = async idLogInUser => {
    const response = await axios.get(
      `http://localhost:8080/subscriptions/withObservables/${idLogInUser}`
    )
    return response.data
  }

  static addSubscribe = async (idLogInUser, IdObserversUser) => {
    const subscribe = {
      requestSubscriberId: idLogInUser,
      responseSubscriberId: IdObserversUser
    }
    const response = await axios.post(
      `http://localhost:8080/subscriptions/add`,
      subscribe
    )
  }  
}
