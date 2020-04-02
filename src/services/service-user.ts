// import host from './service-hosting'
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
      const request = await axios.get(
        "https://strawberry-tart-41911.herokuapp.com/users/"
      )
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static getFilteredUsers = async (valueSearchBox: string) => {
    try {
      const request = await axios.get(
        `https://strawberry-tart-41911.herokuapp.com/users/filter/${valueSearchBox}`
      )
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static editUser = async (id: any, user: {}) => {
    try {
      const request = await axios.put(
        `https://strawberry-tart-41911.herokuapp.com/users/update/${id}`,
        user
      )
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static removeHandler = async (id: string) => {
    try {
      return await axios.delete(
        `https://strawberry-tart-41911.herokuapp.com/users/delete/${id}`
      )
    } catch (e) {
      console.log(e)
    }
  }

  static getUserByID = async (id: string) => {
    try {
      const request = await axios.get(
        `https://strawberry-tart-41911.herokuapp.com/users/${id}`
      )
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static getUserByToken = async () => {
    try {
      const request = await axios.get(
        `https://strawberry-tart-41911.herokuapp.com/users/getUserByToken/`
      )
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static getTokenForLogin = async (id: string, user: {}) => {
    const response = await axios.post(
      `https://strawberry-tart-41911.herokuapp.com/users/login`,
      user
    )
    return response.data
  }

  static getTokenForRegistration = async (id: string, user: {}) => {
    const response = await axios.post(
      `https://strawberry-tart-41911.herokuapp.com/users/add`,
      user
    )
    return response.data
  }

  static logOutAllDevices = async (id: string, user: {}) => {
    const response = await axios.post(
      `https://strawberry-tart-41911.herokuapp.com/users/logOutAllDevices`,
      user
    )
    return response.data
  }

  static getListPetsByUserID = async (id: string) => {
    const response = await axios.get(
      `https://strawberry-tart-41911.herokuapp.com/users/withPets/${id}`
    )
    return response.data
  }

  static setImgUser = async (avatar: any, id: string) => {
    const formData = new FormData()
    formData.append("user", avatar)

    const response = await axios.post(
      `https://strawberry-tart-41911.herokuapp.com/public/userSafeFileIntoImages/${id}`,
      formData
    )
    return response.data.fileName
  }

  static getListAlbumsByUserID = async (id: string) => {
    try {
      const response = await axios.get(
        `https://strawberry-tart-41911.herokuapp.com/users/withAlbums/${id}`
      )

      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  static getListPhotosByUserID = async (id: string) => {
    try {
      const response = await axios.get(
        `https://strawberry-tart-41911.herokuapp.com/users/withPhotos/${id}`
      )
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  static getListAlbumsWithPhotosByUserID = async (id: string) => {
    try {
      const response = await axios.get(
        `https://strawberry-tart-41911.herokuapp.com/users/AlbumsWithPhotos/${id}`
      )
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  static getUserWithSubscriptionsById = async (userLogin: {}) => {
    try {
      const response = await axios.get(
        `https://strawberry-tart-41911.herokuapp.com/users/getUserWithSubscriptionsById/${userLogin}`
      )
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  static getUserAfterPaginationAndSearchAndFilter = async (body: {}) => {
    try {
      const response = await axios.post(
        `https://strawberry-tart-41911.herokuapp.com/users/getUserAfterPaginationAndSearchAndFilter`,
        body
      )
      console.log(response)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}
