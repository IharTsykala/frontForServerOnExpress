const axios = require("axios")

const checkHost = async () => {
  if (await axios.get("http://localhost:8080/")) return "http://localhost:8080/"
  else return "localhost:8080"
}

export default checkHost
