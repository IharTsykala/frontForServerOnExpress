const axios = require("axios")

export default class ServicePhotos {
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
    // console.log(avatar)
    const formData = new FormData()
    for (let i = 0; i < avatar.length; i++) {
      // console.log(avatar[i])
      formData.append("multipleUser", avatar[i])
    }
    const response = await axios.post(
      `http://localhost:8080/public/multipleUserSafeFileIntoImages`,
      formData
    )
    console.log(response.data.fileNames)
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

  static removeHandler = async id => {
    try {
      return await axios.delete(`http://localhost:8080/photos/delete/${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  static addPhotoIntoAlbum = async (idUser, idAlbum, arrayUrl) => {
    // console.log(arrayUrl)
    let arrPhotoUrl =[]
    for (let i = 0; i < arrayUrl.length; i++) {
      // console.log(arrayUrl[i])
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
      arrPhotoUrl =arrPhotoUrl.concat(response.data.photo.url)
    }
    // console.log(arrPhotoUrl)
    return arrPhotoUrl
  }

  static addPhotosIntoFsAndAlbum = async (idUser, idAlbum, arrayFiles) => {
    console.log(idUser, idAlbum, arrayFiles)
    const formData = new FormData()
    const photo = {
      name: `new photo`,
      url: '',
      ownerUser: idUser,
      ownerAlbum: idAlbum
    }
    for (let i = 0; i < arrayFiles.length; i++) {      
      formData.append("multipleUser", arrayFiles[i])
    }
    console.log(formData)
    const response = await axios.post(
      `http://localhost:8080/public/multipleUserSafeFileIntoImages`, 
           formData, photo
    )    
    return response.data.fileNames
  }
}
