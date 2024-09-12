import { api } from 'src/api';
import { SR, TGetParamsChange } from 'src/services/index.types';

import { TProductItem } from './products.types';

export const fetchGetProjects = async (params: TGetParamsChange): Promise<SR<TProductItem>> => {
  const res = await api.get('/products/search', {
    params: { ...params, limit: 6 },
  });
  return { ...res.data, data: res.data.products };
};
