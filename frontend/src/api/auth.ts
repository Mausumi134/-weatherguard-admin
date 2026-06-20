import { api } from './http';
import type { LoginResponse } from '../types';

export async function login(email: string, password: string) {
  const response = await api.post<LoginResponse>('/auth/login', {
    email,
    password,
  });

  return response.data;
}
