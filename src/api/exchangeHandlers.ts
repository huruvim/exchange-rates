import {AxiosInstance as axios} from "./axios";
import {API_ENDPOINTS} from "../constants/apiEndpoints";
import {defaultParams} from "../constants/defaultParams";
import {GetExchangeRate} from "../interfaces/exchanges";

export const getExchangeRate = (): Promise<GetExchangeRate> => {
  return axios.get(API_ENDPOINTS.LIVE, {params: defaultParams})
};
