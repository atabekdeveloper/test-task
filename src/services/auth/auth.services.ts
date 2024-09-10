import { api } from 'src/api';
import { SRO } from 'src/services/index.types';

import { TAuthLogin, IAuthLoginGet, IAuthUserItem } from './auth.types';

export const fetchGetAuth = async (): Promise<SRO<IAuthUserItem>> => {
  const res = await api.get('/auth/me');
  return { ...res.data, data: res.data };
};
export const fetchAuthLogin = async (values: TAuthLogin): Promise<SRO<IAuthLoginGet>> => {
  const res = await api.post('/auth/login', values);
  return { ...res.data, data: res.data };
};
