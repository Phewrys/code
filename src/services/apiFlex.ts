import axios from 'axios'

const apiFlex = axios.create({
    baseURL: 'https://provadev.xlab.digital/api/v1/'
})
export default apiFlex;