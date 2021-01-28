import axios from 'axios'

const apiJSONPlaceholder = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})
export default apiJSONPlaceholder;