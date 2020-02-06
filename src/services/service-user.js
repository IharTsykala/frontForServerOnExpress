const axios = require("axios")

export default class Service {
  
  static getAllUsers = async () => {
    try {
      const request = await axios.get("http://localhost:8080/users/", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static editUser = async (id, user) => {
    try {      
      const request = await axios.put(
        `http://localhost:8080/users/update/${id}`,
        user, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static removeHandler = async id => {
    try {
      return await axios.delete(`http://localhost:8080/users/delete/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
    } catch (e) {
      console.log(e)
    }
  }

  static getUserByID = async id => {
    try {
      const request = await axios.get(`http://localhost:8080/users/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static getTokenForLogin = async (id, user) => {    
    const response = await axios.post(`http://localhost:8080/users/login`, user)
    return response.data
  }

  static getTokenForRegistration = async (id, user) => {       
    const response = await axios.post(`http://localhost:8080/users/add`, user)
    return response.data
  }

  static getListPetsByUserID = async id => {
    const response = await axios.get(
      `http://localhost:8080/users/withPets/${id}`,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      }
    )    
    return response.data
  }

  static setImgUser = async avatar => {
    const formData = new FormData()
    formData.append("test", avatar)
    const response = await axios.post(
      `http://localhost:8080/public/safeFileIntoImages`,
      formData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      }
    )    
    return response.data.fileName
  }  
}
