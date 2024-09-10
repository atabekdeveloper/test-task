import { TGetParamsChange } from 'src/services/index.types';

import { useQuery } from '@tanstack/react-query';

import { fetchGetUsers } from './users.services';

const useGetUsersQuery = (params: TGetParamsChange) =>
  useQuery({
    queryFn: () => fetchGetUsers(params),
    queryKey: ['user', ...Object.values(params)],
  });

export { useGetUsersQuery };
