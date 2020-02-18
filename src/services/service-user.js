const axios = require("axios")

export default class Service {
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

  static getAllUsers = async () => {
    try {
      const request = await axios.get("http://localhost:8080/users/")
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static getFilteredUsers = async (valueSearchBox) => {
    try {      
      const request = await axios.get(`http://localhost:8080/users/filter/${valueSearchBox}`)      
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
      `http://localhost:8080/users/withPets/${id}`
    )
    return response.data
  }

  static setImgUser = async (avatar, id, userRole) => {
    // let url
    const formData = new FormData()
    formData.append("user", avatar)
    // if (userRole === "admin")
    //   url = `http://localhost:8080/public/adminSafeFileIntoImages/${id}`
    // else url = `http://localhost:8080/public/userSafeFileIntoImages`

    const response = await axios.post(
      `http://localhost:8080/public/userSafeFileIntoImages`,
      formData
    )
    return response.data.fileName
  }

  static getListAlbumsByUserID = async id => {
    try {
      // console.log(id)
      const response = await axios.get(
        `http://localhost:8080/users/withAlbums/${id}`
      )
      // console.log(response)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  static getListPhotosByUserID = async id => {
    try {
      console.log(id)
      const response = await axios.get(
        `http://localhost:8080/users/withPhotos/${id}`
      )
      // console.log( `http://localhost:8080/users/withAlbum/${id}`)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  static getListAlbumsWithPhotosByUserID = async id => {
    try {
      // console.log(id)s
      const response = await axios.get(
        `http://localhost:8080/users/AlbumsWithPhotos/${id}`
      )
      // console.log(response.data)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}
