const axios = require("axios")

export default class ServiceAlbums {
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

  static getAllAlbums = async () => {
    try {
      const request = await axios.get("http://localhost:8080/Albums/")
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static addAlbum = async id => {
    const album = {
      name: "new album",
      owner: id
    }
    const response = await axios.post(`http://localhost:8080/albums/add`, album)
    return response.data
  }

  static editAlbum = async (id, user) => {
    try {
      const request = await axios.put(
        `http://localhost:8080/albums/update/${id}`,
        user
      )
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static removeHandler = async id => {
    try {
      return await axios.delete(`http://localhost:8080/albums/delete/${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  static getListAlbumsByUserID = async id => {
    try {
      // console.log(id)
      const response = await axios.get(
        `http://localhost:8080/users/withAlbums/${id}`
      )
      // console.log( `http://localhost:8080/users/withAlbum/${id}`)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}
