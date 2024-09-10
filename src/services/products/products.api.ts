import { TGetParamsChange } from 'src/services/index.types';

import { useQuery } from '@tanstack/react-query';

import { fetchGetProjects } from './products.services';

const useGetProductsQuery = (params: TGetParamsChange) =>
  useQuery({
    queryFn: () => fetchGetProjects(params),
    queryKey: ['product', ...Object.values(params)],
  });

export { useGetProductsQuery };
