import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://jubelsusu-7oy9.onrender.com'
})


axiosInstance.interceptors.request.use((config) => {
    const accessToken = "";
    if (config.headers && accessToken) {
        config.headers.token = accessToken;
    }

    return config;
}, (error) => {
    //handle errors here
    return Promise.reject(error);
})


axiosInstance.interceptors.response.use((response) => {
     return response;

}, (error) => {
    console.log('Error',error)
    //handle errors here
    return Promise.reject(error);
});

export default axiosInstance;