import axios from 'axios';
import CryptoJS from 'crypto-js';
import {  setLoading, setMsg, logout } from '../store/features/user/UserSlice';
import { SECRET_KEY, SERVER_HOST } from "../helper/constants"

let store

export const injectStore = _store => {
  store = _store
}

export const getPersistUser = (key) => {
  if (localStorage.getItem('persist:auth') !== undefined) {
    let localStorageObj = JSON.parse(localStorage.getItem('persist:auth'));
    if (localStorageObj !== null) {
      localStorageObj = JSON.parse(localStorageObj.user)
      const bytes = CryptoJS.AES.decrypt(localStorageObj, SECRET_KEY);
      let decrypted = bytes.toString(CryptoJS.enc.Utf8);
      decrypted = JSON.parse(decrypted);
      return decrypted;
    }
  }
}

export const getPersistUserData = (key) => {
  if (key === null || key === '') {
    return getPersistUser()
  } else {
    const value = store.getState().user[key]
    if (value === null || value === '') {
      return getPersistUser()[key]
    }
    return value;
  }
}
export const apiRequest = (method, uri, body, header) => {
  const url = `${SERVER_HOST.base_path}${uri}`;
  const httpMethod = method.toUpperCase();

  const requestOptions = {
    method: method,
    headers: SERVER_HOST.jsonHeader
  };

  if (httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH') {
    requestOptions.body = JSON.stringify(body);
  }
  return fetch(url, requestOptions);
};
axios.interceptors.request.use((config) => {
  store.dispatch(setLoading(true))
  const token = getPersistUserData('token'); 
  if (token !== null && token.length !== 0  ) {
    config.headers.Authorization = `Bearer ${token}`;

  } 
  store.dispatch(setLoading(false))
  return config;
}, (error) => {
  store.dispatch(setLoading(false))
  // Do something with request error
  return Promise.reject(error);
});

 
export const apiRequestAxio = (method, uri, body, header) => {
  const httpMethod = method.toUpperCase();
  const requestOptions = {
    url: `${SERVER_HOST.base_path}${uri}`,
    method: method.toUpperCase(),
    headers: { ...SERVER_HOST.jsonHeader, ...header }
  };

  if (httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH') {
    requestOptions.data = header["content-type"] === "multipart/form-data" ? body : JSON.stringify(body);
  }

  let response = axios(requestOptions);

  response.then(result => {
    if (!result) {
      response = new Promise((resolve, reject) => {
        resolve({ data: [] });
      });
    }
  })
  return response
};

