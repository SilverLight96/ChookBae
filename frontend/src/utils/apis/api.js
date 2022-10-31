import axios from 'axios';
import { getCookie, removeCookie, setCookie } from '../functions/cookies';

export const instance = axios.create({
  baseURL: "https://k7a202.p.ssafy.io/",
  // baseURL: "http://localhost:8000",
  headers: {
    'Content-Type': 'application/json',
  },
});


const getAccessToken = () => {
  const accessToken = getCookie('accessToken');
  return accessToken;
};

const getLocalRefreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return refreshToken;
};

export const setRefreshToken = (refreshToken) => {
  localStorage.setItem('refreshToken', refreshToken);
};

export const removeRefreshToken = () => {
  localStorage.removeItem('refreshToken');
};

const getNewAccessToken = () => {
  return axiosInstance.get('/api/member/refresh', {
    headers: {
      Authorization: '',
      'ACCESS-TOKEN': `Bearer ${getAccessToken()}`,
      'REFRESH-TOKEN': `Bearer ${getLocalRefreshToken()}`,
    },
  });
};

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401 && err.response.data?.error === 'TokenExpiredException') {
        try {
          const response = await getNewAccessToken();
          console.log(response);
          const { accessToken, refreshToken } = response.data;
          setCookie('accessToken', accessToken);
          setRefreshToken(refreshToken);
          instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
          return instance(originalConfig);
        } catch (err) {
          if (err.response.status === 401 && err.response.data?.message === 'REFRESH_ERROR') {
            removeCookie('accessToken');
            removeRefreshToken();
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
            return;
          }
          return Promise.reject(err);
        }
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);

export const fetchData = {
  get: async (url, option) => await instance.get(url, option),
  post: async (url, body, option) => await instance.post(url, body, option),
  put: async (url, body, option) => await instance.put(url, body, option),
  patch: async (url, body, option) => await instance.patch(url, body, option),
  delete: async (url, body, option) => await instance.delete(url, body, option),
};

