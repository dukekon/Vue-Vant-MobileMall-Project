/// <reference types="vite/client" />
import { AxiosRequestConfig, AxiosInstance } from 'axios'

declare module 'axios' {
  interface AxiosResponse {
    errno: number,
    errmsg: string,
    data: any
  }

  export const create = (config: AxiosRequestConfig) => AxiosInstance
}
