import axios from "axios";


const AxiosInstance = axios.create({
  baseURL: 'https://exchange-rates.abstractapi.com/v1',
  timeout: 20000
});

AxiosInstance.interceptors.response.use((response) => {
  return response.data;
})

export { AxiosInstance };