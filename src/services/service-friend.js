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
    // console.log(response.data)
    return response.data
  }

//   static getAllObservables = async idLogInUser => {
//     const response = await axios.get(
//       `http://localhost:8080/subscriptions/withObservables/${idLogInUser}`
//     )
//     return response.data
//   }

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

}