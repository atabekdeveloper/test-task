import axios from 'axios';
import { baseURL } from 'src/config';

const api = axios.create({ baseURL });

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${
    JSON.parse(`${localStorage.getItem('token')}`)?.state.token
  }`;
  return config;
};
api.interceptors.request.use(authInterceptor);

export { api };
