import { api } from 'src/api';
import { SR, TGetParamsChange } from 'src/services/index.types';

import { TProductItem } from './products.types';

export const fetchGetProjects = async (params: TGetParamsChange): Promise<SR<TProductItem>> => {
  const res = await api.get('/products', {
    params: { ...params },
  });
  return { ...res.data, data: res.data.products };
};
