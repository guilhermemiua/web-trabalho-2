import axios from 'axios'

const api = axios.create({
  baseURL: "https://trabalho-2-web.herokuapp.com"
})

export default api