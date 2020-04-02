const axios = require("axios")

const checkHost = async () => {
  if (await axios.get("http://strawberry-tart-41911.herokuapp.com/"))
    return "http://strawberry-tart-41911.herokuapp.com/"
  else return "strawberry-tart-41911.herokuapp.com"
}

export default checkHost
