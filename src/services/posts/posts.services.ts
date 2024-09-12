import { api } from 'src/api';
import { SR, TGetParamsChange } from 'src/services/index.types';

import { TPostItem } from './posts.types';

export const fetchGetPosts = async (params: TGetParamsChange): Promise<SR<TPostItem>> => {
  const res = await api.get('/posts/search', {
    params: { ...params, limit: 6 },
  });
  return { ...res.data, data: res.data.posts };
};
