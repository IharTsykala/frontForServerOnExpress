const axios = require("axios")

export default class ServiceFriends {
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

  static getLogInUserAllFriends = async (idLogInUser: string) => {
    const response = await axios.get(
      `https://strawberry-tart-41911.herokuapp.com/friends/logInUserAllFriends/?id=${idLogInUser}`
    )
    return response.data
  }

  static addFriend = async (idLogInUser: string, IdRequestUser: string) => {
    const subscribe = {
      requestFriendId: idLogInUser,
      responseFriendId: IdRequestUser
    }
    await axios.post(
      `https://strawberry-tart-41911.herokuapp.com/friends/add`,
      subscribe
    )
  }

  static removeFriend = async (idLogInUser: string, IdSecondUser: string) => {
    await axios.delete(
      `https://strawberry-tart-41911.herokuapp.com/friends/removeFriend/?idLogInUser=${idLogInUser}&IdSecondUser=${IdSecondUser}`
    )
  }

  static getArrayFriendsByIdUser = async (idLogInUser: string) => {
    const response = await axios.get(
      `https://strawberry-tart-41911.herokuapp.com/friends/getArrayFriendsByIdUser/?idLogInUser=${idLogInUser}`
    )
    // console.log(response.data)
    return response.data
  }
}
