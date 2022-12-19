import {AxiosInstance as axios} from "./axios";
import {API_ENDPOINTS} from "../constants/apiEndpoints";
import {defaultParams} from "../constants/defaultParams";

export interface GetExchangeRate {
  base: string;
  exchange_rates: { [value: string]: number };
  last_updated: number;
}


export const getExchangeRate = (): Promise<GetExchangeRate> => {
  return axios.get(API_ENDPOINTS.LIVE, {params: defaultParams})
};
