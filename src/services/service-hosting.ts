const axios = require('axios')

const checkHost = async () => {
  if (await axios.get('https://localhost:8080/'))
    return 'https://localhost:8080/'
  else return 'localhost:8080'
}

export default checkHost
