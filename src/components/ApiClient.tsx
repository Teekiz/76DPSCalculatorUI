import axios, {AxiosInstance} from "axios"

const ApiClient = (): AxiosInstance => {
    return axios.create({
        baseURL: 'http://localhost:8080/api/',
        timeout: 1000
    });
}

export default ApiClient;