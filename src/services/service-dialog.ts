const axios = require("axios")

export default class ServiceDialog {
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

  static getAllDialogs = async () => {
    try {
      const request = await axios.get("http://localhost:8080/dialogs/")
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static getAllDialogsById = async (id: string) => {
    try {
      // console.log(id)
      const request = await axios.get(`http://localhost:8080/dialogs/${id}`)
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static addDialog = async (body: {}) => {
    console.log(body)
    const response = await axios.post(
      "http://localhost:8080/dialogs/addDialog",
      body
    )
    return response.data
  }
}
