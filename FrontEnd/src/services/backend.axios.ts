import axios from 'axios'

const backendApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export default backendApi;