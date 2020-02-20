const axios = require("axios")

export default class ServiceSubscriptions {
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

  static getAllSubscribes = async idLogInUser => {
    const response = await axios.get(
      `http://localhost:8080/subscriptions/withSubscriptions/${idLogInUser}`
    ) 
    console.log(response.data)      
    return response.data
  }

  static getAllObservables = async idLogInUser => {
    const response = await axios.get(
      `http://localhost:8080/subscriptions/withObservables/${idLogInUser}`
    )
    return response.data
  }

  static addSubscribe = async (idLogInUser, IdObserversUser) => {
    const subscribe = {
      requestSubscriberId: idLogInUser,
      responseSubscriberId: IdObserversUser
    }
    const response = await axios.post(
      `http://localhost:8080/subscriptions/add`,
      subscribe
    )
  }

  //   static removeHandler = async id => {
  //     try {
  //       return await axios.delete(`http://localhost:8080/photos/delete/${id}`)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }

  //   static addPhotoIntoAlbum = async (idUser, idAlbum, arrayUrl) => {
  //     let arrPhotoUrl =[]
  //     for (let i = 0; i < arrayUrl.length; i++) {
  //       const photo = {
  //         name: `${arrayUrl[i]}`,
  //         url: arrayUrl[i],
  //         ownerUser: idUser,
  //         ownerAlbum: idAlbum
  //       }
  //       const response = await axios.post(
  //         `http://localhost:8080/photos/addIntoAlbum`,
  //         photo
  //       )
  //       arrPhotoUrl =arrPhotoUrl.concat(response.data.photo.url)
  //     }
  //     return arrPhotoUrl
  //   }

  //   static addPhotosIntoFsAndAlbum = async (idUser, idAlbum, arrayFiles) => {
  //     const formData = new FormData()
  //     for (let i = 0; i < arrayFiles.length; i++) {
  //       formData.append("multipleUser", arrayFiles[i])
  //     }
  //     const response = await axios.post(
  //       `http://localhost:8080/public/multipleUserSafeFileIntoImages/?idUser=${idUser}&idAlbum=${idAlbum}`,
  //            formData
  //     )
  //     return response.data.fileNames
  //   }
}
