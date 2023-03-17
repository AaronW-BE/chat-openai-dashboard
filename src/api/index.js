import axios from 'axios'
import {redirect} from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 6000,
  headers: {
    "Content-Type": "application/json"
  }
})

axiosInstance.interceptors.request.use((config) => {
  // lang modify
  let lang = localStorage.getItem('lang');
  if (lang) {
    config.headers['Accept-Language'] = lang;
  }

  // parse url params
  config.params && Object.keys(config.params).map(k => {
    config.url = config.url.replace(`:${k}`, config.params[k]);
  });

  console.log('parsed url param', config.url);

  let tokenData = localStorage.getItem('token');
  let tokenObj = JSON.parse(tokenData);
  if (tokenData && tokenObj) {
    const {value, expireAt} = tokenObj;
    if (expireAt > Date.now()) {
      config.headers.Authorization = "Bearer " + value;
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  if (response.status === 401) {
    // no auth
    redirect("/login");
    return Promise.reject("need auth");
  }

  if (response.status === 200) {
    return response.data;
  }
  throw new Error(response.data)
}, error => {
  return Promise.reject(error);
})

export const GET = (url, params = {}, query = {}, headers = {}) => {
  return axiosInstance.get(url, {
    data: query,
    headers,
    params
  })
}

export const POST = (url, params, data, query, headers) => {
  return axiosInstance.post(url, data, {headers})
}

const PUT = () => {

}

const DELETE = () => {

}