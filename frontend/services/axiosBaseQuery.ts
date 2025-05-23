import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';

export const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }: AxiosRequestConfig) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URI;

    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (error) {
      const axiosError = error as AxiosError;

      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };
