import { AlertTriangle } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { WeatherAlert } from '../types';

export function AlertList({
  alerts,
  isLoading,
}: {
  alerts: WeatherAlert[];
  isLoading: boolean;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-950">
          Recent weather alerts
        </h2>
        <span className="text-xs text-slate-500">{alerts.length} shown</span>
      </div>

      <div className="divide-y divide-slate-100">
        {isLoading ? (
          <p className="px-4 py-5 text-sm text-slate-500">Loading alerts...</p>
        ) : alerts.length === 0 ? (
          <p className="px-4 py-5 text-sm text-slate-500">
            No alerts yet. Approve a user and trigger the demo alert.
          </p>
        ) : (
          alerts.map((alert) => (
            <article key={alert.id} className="flex gap-3 px-4 py-4">
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                <AlertTriangle size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-slate-950">
                    {alert.condition} in {alert.city}
                  </p>
                  <StatusBadge label={alert.severity} tone="severity" />
                </div>
                <p className="mt-1 text-sm text-slate-600">{alert.message}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {alert.user.name} - {alert.temperature} C -{' '}
                  {new Date(alert.createdAt).toLocaleString()}
                </p>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
