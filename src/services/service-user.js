const axios = require("axios")

export default class Service {
  constructor() {}

  static getAllUsers = async () => {
    try {
      const request = await axios.get("http://localhost:8080/users/")
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static editUser = async (id, user) => {
    try {
      const request = await axios.put(
        `http://localhost:8080/users/update/${id}`,
        user
      )
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static removeHandler = async id => {
    try {
      return await axios.delete(`http://localhost:8080/users/delete/${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  static getUserByID = async id => {
    try {
      const request = await axios.get(`http://localhost:8080/users/${id}`)
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static getTokenForLogin = async user => {
    const response = await axios.post(`http://localhost:8080/users/login`, user)
    return response.data
  }

  static getTokenForRegistration = async user => {
    const response = await axios.post(`http://localhost:8080/users/add`, user)
    return response.data
  }
}
