import { TGetParamsChange } from 'src/services/index.types';

import { useQuery } from '@tanstack/react-query';

import { fetchGetPosts } from './posts.services';

const useGetPostsQuery = (params: TGetParamsChange) =>
  useQuery({
    queryFn: () => fetchGetPosts(params),
    queryKey: ['post', ...Object.values(params)],
  });

export { useGetPostsQuery };
