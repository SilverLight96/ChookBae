import axios from 'axios';
import { getCookie } from '../functions/cookies';

const getToken = () => {
  const accessToken = getCookie('token');
  return accessToken;
}

export const instance = axios.create({
  baseURL: "https://k7a202.p.ssafy.io/",
  // baseURL: "http://localhost:8000",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `${getToken()}`,
  },
});

export const fetchData = {
  get: async (url, option) => await instance.get(url, option),
  post: async (url, body, option) => await instance.post(url, body, option),
  put: async (url, body, option) => await instance.put(url, body, option),
  patch: async (url, body, option) => await instance.patch(url, body, option),
  delete: async (url, body, option) => await instance.delete(url, body, option),
};

