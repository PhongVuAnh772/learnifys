import axios, {AxiosRequestConfig} from "axios";
import {store} from "@/redux/store";

export const API_URL = "https://crm.zikii.vn/apis";

class ApiService {
  axiosInstance = axios.create({
    baseURL: API_URL,
  });

  constructor() {
    this.axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        if (error.response.data.message === 'SESSION_EXPIRED') {
          const {accessToken} = store.getState().auth.tokens;
          if (accessToken) {
            error.config.headers.Authorization = `Bearer ${accessToken}`;
            return this.axiosInstance(error.config);
          }
        }
        return Promise.reject(error);
      },
    );
  }

  async post(endpoint: string, data?: any) {
    return this.callApi("POST", endpoint, data);
  }

  async get(endpoint: string, data?: any, config: AxiosRequestConfig = {}) {
    return this.callApi("GET", endpoint, data, config);
  }

  async put(endpoint: string, data?: any) {
    return this.callApi("PUT", endpoint, data);
  }

  async delete(endpoint: string, data?: any) {
    return this.callApi("DELETE", endpoint, data);
  }


  

  async callApi(method: string, endpoint: string, data: any = {}, config?: AxiosRequestConfig) {
    try {
      const r = await this.axiosInstance({
        method,
        url: endpoint,
        data: method.toLowerCase() === "get" ? undefined : data,
        ...config,
      });
      return r.data;
    } catch (e: any) {
      if (e.response) {
        if (e.response.data) throw e.response.data;
        throw e.response;
      } else {
        throw e;
      }
    }
  }
}

export default new ApiService();
