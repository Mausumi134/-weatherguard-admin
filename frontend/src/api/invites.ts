import { api } from './http';
import type { InviteRequest, InviteStatusResponse, User } from '../types';

export async function requestInvite(inviteRequest: InviteRequest) {
  const response = await api.post<{ message: string; user: User }>(
    '/invites/request',
    inviteRequest,
  );

  return response.data;
}

export async function getInviteStatus(email: string) {
  const response = await api.get<InviteStatusResponse>('/invites/status', {
    params: { email },
  });

  return response.data;
}
