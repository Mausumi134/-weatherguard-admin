import { api } from './http';
import type { InviteStatus, User } from '../types';

export async function getUsers(status?: InviteStatus) {
  const response = await api.get<User[]>('/users', {
    params: status ? { status } : undefined,
  });

  return response.data;
}

export async function updateUserStatus(id: string, status: InviteStatus) {
  const response = await api.patch<{ message: string; user: User }>(
    `/users/${id}/status`,
    { status },
  );

  return response.data;
}
