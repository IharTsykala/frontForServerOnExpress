const axios = require("axios")

export default class ServiceAlbums {
  // static removeHandler = async id => {
  //   try {
  //     console.log(id)
  //     return await axios.delete(`http://localhost:8080/albums/delete/${id}`, {
  //       headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  //     })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  static addAlbum = async id => {
    console.log(id)
    const album = {
      name: "new album",
      owner: id
    }
    const response = await axios.post(`http://localhost:8080/albums/add`, album)
    return response.data
  }

  static removeHandler = async id => {
    try {
      console.log(id)
      return await axios.delete(`http://localhost:8080/photos/delete/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
    } catch (e) {
      console.log(e)
    }
  }

  static setImgUser = async avatar => {
    console.log(avatar)
    // let url;
    const formData = new FormData()
    formData.append("user", avatar)
    // if(userRole==='admin')  url =  `http://localhost:8080/public/adminSafeFileIntoImages/${id}`
    // else url= `http://localhost:8080/public/userSafeFileIntoImages`

    const response = await axios.post(
      `http://localhost:8080/public/userSafeFileIntoImages`,
      formData
    )
    console.log(response)
    return response.data.fileName
  }

  static addPhoto = async (id, url) => {
    // console.log(url)
    const photo = {
      name: "new photo",
      url,
      ownerUser: id
    }
    const response = await axios.post(`http://localhost:8080/photos/add`, photo)
    return response.data
  }
}
