import { useAuthPersistStore } from 'src/store';
import toast from 'react-hot-toast';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchAuthLogin, fetchGetAuth } from './auth.services';

const useGetAuthUserQuery = () => {
  const { signOut } = useAuthPersistStore();
  return useQuery({
    queryFn: fetchGetAuth,
    queryKey: ['auth'],
    onError: (err: any) => {
      signOut();
      toast.error(err.response.data.message);
    },
  });
};

const useAuthLoginMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchAuthLogin,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['auth'] });
      toast.success('Successfully logged in');
    },
    onError: (err: any) => toast.error(err.response.data.message),
  });
};

export { useAuthLoginMutation, useGetAuthUserQuery };
