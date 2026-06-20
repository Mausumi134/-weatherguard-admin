import { api } from './http';
import type { WeatherAlert } from '../types';

export async function getWeatherAlerts() {
  const response = await api.get<WeatherAlert[]>('/weather/alerts');
  return response.data;
}

export async function triggerWeatherDemo() {
  const response = await api.post<{
    source: string;
    created: number;
    alerts: WeatherAlert[];
  }>('/weather/trigger-demo');

  return response.data;
}
