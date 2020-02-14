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

  static setImgUser = async avatar => {
    console.log(avatar)
    const formData = new FormData()
    for (let i = 0; i < avatar.length; i++) {
      console.log(avatar[i])
      formData.append("multipleUser", avatar[i])
    }
    const response = await axios.post(
      `http://localhost:8080/public/multipleUserSafeFileIntoImages`,
      formData
    )
    return response.data.fileNames
  }

  static addPhoto = async (idUser, arrayUrl) => {
    for (let i = 0; i < arrayUrl.length; i++) {
      const photo = {
        name: `${arrayUrl[i]}`,
        url: arrayUrl[i],
        ownerUser: idUser
      }
      const response = await axios.post(
        `http://localhost:8080/photos/add`,
        photo
      )
      console.log(response)
    }
  }

  static addPhotoIntoAlbum = async (idUser, idAlbum, arrayUrl) => {
    for (let i = 0; i < arrayUrl.length; i++) {
      const photo = {
        name: `${arrayUrl[i]}`,
        url: arrayUrl[i],
        ownerUser: idUser,
        ownerAlbum: idAlbum
      }
      const response = await axios.post(
        `http://localhost:8080/photos/addIntoAlbum`,
        photo
      )
      return response.data.photo.url
    }
  }
}
