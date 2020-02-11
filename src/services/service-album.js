const axios = require("axios")

export default class ServiceAlbums {
  
  static removeHandler = async id => {
    try {
      console.log(id)
      return await axios.delete(`http://localhost:8080/albums/delete/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
    } catch (e) {
      console.log(e)
    }
  }

  static addAlbum = async (id) => {
    console.log(id)
    const album = {
      name: 'new album',
      owner: id
    }
    const response = await axios.post(`http://localhost:8080/albums/add`, album)
    return response.data
  }


}