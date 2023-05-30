import axiosOriginal from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL

export const axiosOptions: AxiosRequestConfig = {
  withCredentials: true,
  baseURL,
};

const axios: AxiosInstance = axiosOriginal.create(axiosOptions);

axios.interceptors.response.use((response) => response);

export { axios };
