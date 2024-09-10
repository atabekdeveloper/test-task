import { api } from 'src/api';
import { SR, TGetParamsChange } from 'src/services/index.types';

import { TUserItem } from './users.types';

export const fetchGetUsers = async (params: TGetParamsChange): Promise<SR<TUserItem>> => {
  const res = await api.get('/users', {
    params: { ...params },
  });
  return { ...res.data, data: res.data.users };
};
