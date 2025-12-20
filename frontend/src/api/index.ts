import axios from 'axios';
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
export const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers:{'Content-Type':'application/json'},
  timeout:0,
})

api.interceptors.request.use(async(config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;