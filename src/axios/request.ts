import axios, { AxiosInstance } from 'axios';

const url = process.env.URL || 'http://localhost:3000';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export const GET = async (url: string, params: Record<string, any> = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const POST = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
