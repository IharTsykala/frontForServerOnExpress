const axios = require("axios")

export default class ServiceFriends {
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

  static getLogInUserAllFriends = async idLogInUser => {
    const response = await axios.get(
      `http://localhost:8080/friends/logInUserAllFriends/?id=${idLogInUser}`
    )    
    return response.data
  }

  static addFriend = async (idLogInUser, IdRequestUser) => {
    const subscribe = {
      requestFriendId: idLogInUser,
      responseFriendId: IdRequestUser
    }
    const response = await axios.post(
      `http://localhost:8080/friends/add`,
      subscribe
    )
  }

  static removeFriend = async (idLogInUser, IdSecondUser) => {
    const response = await axios.delete(
      `http://localhost:8080/friends/removeFriend/?idLogInUser=${idLogInUser}&IdSecondUser=${IdSecondUser}`
    )
  }

  static getArrayFriendsByIdUser = async idLogInUser => {
    const response = await axios.get(
      `http://localhost:8080/friends/getArrayFriendsByIdUser/?idLogInUser=${idLogInUser}`
    )
    return response.data
  }
}
