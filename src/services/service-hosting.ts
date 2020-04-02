const axios = require("axios")

const checkHost = async () => {
  if (await axios.get("https://strawberry-tart-41911.herokuapp.com/"))
    return "https://strawberry-tart-41911.herokuapp.com/"
  else return "strawberry-tart-41911.herokuapp.com"
}

export default checkHost
