import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsers, updateUserStatus } from '../api/users';
import { getWeatherAlerts, triggerWeatherDemo } from '../api/weather';
import type { InviteStatus } from '../types';

export function useUsers(status: InviteStatus) {
  return useQuery({
    queryKey: ['users', status],
    queryFn: () => getUsers(status),
  });
}

export function useWeatherAlerts() {
  return useQuery({
    queryKey: ['weather-alerts'],
    queryFn: getWeatherAlerts,
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: InviteStatus }) =>
      updateUserStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['weather-alerts'] });
    },
  });
}

export function useTriggerWeatherDemo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: triggerWeatherDemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weather-alerts'] });
    },
  });
}
