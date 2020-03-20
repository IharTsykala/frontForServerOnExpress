const axios = require("axios")

export default class ServiceMessage {
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

  static getAllMessagesByIdDialog = async (idDialog: string) => {
    try {
      const request = await axios.get(
        `http://localhost:8080/messages/${idDialog}`
      )
      return request.data
    } catch (e) {
      console.log(e)
    }
  }
}
