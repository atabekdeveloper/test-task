import { api } from 'src/api';
import { SR, TGetParamsChange } from 'src/services/index.types';

import { TTodoItem } from './todos.types';

export const fetchGetTodos = async (params: TGetParamsChange): Promise<SR<TTodoItem>> => {
  const res = await api.get('/todos', {
    params: { ...params, limit: 6 },
  });
  return { ...res.data, data: res.data.todos };
};
