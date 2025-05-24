import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }: AxiosRequestConfig) => {
    const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

    try {
      const result = await axios({
        url: baseUrl && baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
