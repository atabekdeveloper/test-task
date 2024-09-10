import { TGetParamsChange } from 'src/services/index.types';

import { useQuery } from '@tanstack/react-query';

import { fetchGetTodos } from './todos.services';

const useGetTodosQuery = (params: TGetParamsChange) =>
  useQuery({
    queryFn: () => fetchGetTodos(params),
    queryKey: ['todo', ...Object.values(params)],
  });

export { useGetTodosQuery };
