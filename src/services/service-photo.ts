const axios = require("axios")

export default class ServicePhotos {
  static interceptor = axios.interceptors.request.use(
    function (config: any) {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    function (error: string) {
      return Promise.reject(error)
    }
  )

  static getPhotosById = async (userId: string) => {
    try {
      return await axios.get(`http://localhost:8080/photos/${userId}`)
    } catch (e) {
      console.log(e)
    }
  }

  static setImgUser = async (avatar: any) => {
    const formData = new FormData()
    for (let i = 0; i < avatar.length; i++) {
      formData.append("multipleUser", avatar[i])
    }
    const response = await axios.post(
      `http://localhost:8080/public/multipleUserSafeFileIntoImages`,
      formData
    )
    return response.data.fileNames
  }

  static addPhoto = async (idUser: string, arrayUrl: string) => {
    for (let i = 0; i < arrayUrl.length; i++) {
      const photo = {
        name: `${arrayUrl[i]}`,
        url: arrayUrl[i],
        ownerUser: idUser,
      }
      const response = await axios.post(
        `http://localhost:8080/photos/add`,
        photo
      )
      console.log(response)
    }
  }

  static removeHandler = async (id: string) => {
    try {
      return await axios.delete(`http://localhost:8080/photos/delete/${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  static addPhotoIntoAlbum = async (
    idUser: string,
    idAlbum: string,
    arrayUrl: []
  ) => {
    let arrPhotoUrl: any = []
    for (let i = 0; i < arrayUrl.length; i++) {
      const photo = {
        name: `${arrayUrl[i]}`,
        url: arrayUrl[i],
        ownerUser: idUser,
        ownerAlbum: idAlbum,
      }
      const response = await axios.post(
        `http://localhost:8080/photos/addIntoAlbum`,
        photo
      )
      arrPhotoUrl = arrPhotoUrl.concat(response.data.photo.url)
    }
    return arrPhotoUrl
  }

  static addPhotosIntoFsAndAlbum = async (
    idUser: any,
    idAlbum: string,
    arrayFiles: any
  ) => {
    const formData = new FormData()
    for (let i = 0; i < arrayFiles.length; i++) {
      formData.append("multipleUser", arrayFiles[i])
    }
    const response = await axios.post(
      `http://localhost:8080/public/multipleUserSafeFileIntoImages/?idUser=${idUser}&idAlbum=${idAlbum}`,
      formData
    )
    return response.data.fileNames
  }
}
