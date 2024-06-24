import axios from "axios";
import { useAuth } from "../stores/use-auth";

export const axiosIntance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosIntance.interceptors.request.use((req) => {
  const accessToken = useAuth.getState().accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});
