const axios = require("axios")

export default class Service {
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

  static getAllUsers = async () => {
    try {
      const request = await axios.get("http://localhost:8080/users/")
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static getFilteredUsers = async (valueSearchBox: string) => {
    try {
      const request = await axios.get(
        `http://localhost:8080/users/filter/${valueSearchBox}`
      )
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static editUser = async (id: any, user: {}) => {
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

  static removeHandler = async (id: any) => {
    try {
      return await axios.delete(`http://localhost:8080/users/delete/${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  static getUserByID = async (id: string) => {
    try {
      const request = await axios.get(`http://localhost:8080/users/${id}`)
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static getUserByToken = async () => {
    try {
      const request = await axios.get(
        `http://localhost:8080/users/getUserByToken/`
      )
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static getTokenForLogin = async (id: string, user: {}) => {
    const response = await axios.post(`http://localhost:8080/users/login`, user)
    return response.data
  }

  static getTokenForRegistration = async (id: string, user: {}) => {
    const response = await axios.post(`http://localhost:8080/users/add`, user)
    return response.data
  }

  static logOutAllDevices = async (id: any, user: {}) => {
    const response = await axios.post(
      `http://localhost:8080/users/logOutAllDevices`,
      user
    )
    return response.data
  }

  static getListPetsByUserID = async (id: string) => {
    const response = await axios.get(
      `http://localhost:8080/users/withPets/${id}`
    )
    return response.data
  }

  static setImgUser = async (avatar: any, id: any) => {
    const formData = new FormData()
    formData.append("user", avatar)

    const response = await axios.post(
      `http://localhost:8080/public/userSafeFileIntoImages/${id}`,
      formData
    )
    return response.data.fileName
  }

  static getListAlbumsByUserID = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/withAlbums/${id}`
      )

      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  static getListPhotosByUserID = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/withPhotos/${id}`
      )
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  static getListAlbumsWithPhotosByUserID = async (id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/AlbumsWithPhotos/${id}`
      )
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  static getUserWithSubscriptionsById = async (userLogin: any) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/getUserWithSubscriptionsById/${userLogin}`
      )
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  static getUserAfterPaginationAndSearchAndFilter = async (body: any) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/users/getUserAfterPaginationAndSearchAndFilter`,
        body
      )
      console.log(response)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}
