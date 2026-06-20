import type { ReactNode } from 'react';
import { CloudLightning, RefreshCcw, UsersRound } from 'lucide-react';
import { AlertList } from '../components/AlertList';
import { AppShell } from '../components/AppShell';
import { UserTable } from '../components/UserTable';
import {
  useTriggerWeatherDemo,
  useUpdateUserStatus,
  useUsers,
  useWeatherAlerts,
} from '../hooks/useAdminData';
import { getApiError } from '../api/http';

export function DashboardPage() {
  const pendingUsers = useUsers('PENDING');
  const approvedUsers = useUsers('APPROVED');
  const alerts = useWeatherAlerts();
  const updateStatus = useUpdateUserStatus();
  const triggerWeather = useTriggerWeatherDemo();

  const isWorking = updateStatus.isPending || triggerWeather.isPending;

  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-700">
            WeatherGuard Admin
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-slate-950">
            Invite approvals and weather alerts
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Review pending users, approve access, and trigger a simulated
            weather check for approved locations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => triggerWeather.mutate()}
          disabled={isWorking}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <CloudLightning size={17} />
          {triggerWeather.isPending ? 'Triggering...' : 'Trigger demo alert'}
        </button>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Metric
          icon={<UsersRound size={18} />}
          label="Pending"
          value={pendingUsers.data?.length ?? 0}
        />
        <Metric
          icon={<UsersRound size={18} />}
          label="Approved"
          value={approvedUsers.data?.length ?? 0}
        />
        <Metric
          icon={<RefreshCcw size={18} />}
          label="Recent alerts"
          value={alerts.data?.length ?? 0}
        />
      </div>

      {updateStatus.isError ? (
        <p className="mb-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {getApiError(updateStatus.error)}
        </p>
      ) : null}

      {triggerWeather.isSuccess ? (
        <p className="mb-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          Triggered {triggerWeather.data.created} alert
          {triggerWeather.data.created === 1 ? '' : 's'}.
        </p>
      ) : null}

      {triggerWeather.isError ? (
        <p className="mb-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {getApiError(triggerWeather.error)}
        </p>
      ) : null}

      <div className="grid gap-6">
        <UserTable
          title="Pending users"
          users={pendingUsers.data ?? []}
          isLoading={pendingUsers.isLoading}
          actionUserId={updateStatus.variables?.id}
          emptyText="No pending invite requests."
          onStatusChange={(id, status) => updateStatus.mutate({ id, status })}
        />

        <UserTable
          title="Approved users"
          users={approvedUsers.data ?? []}
          isLoading={approvedUsers.isLoading}
          emptyText="No approved users yet."
        />

        <AlertList
          alerts={alerts.data ?? []}
          isLoading={alerts.isLoading}
        />
      </div>
    </AppShell>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className="text-slate-500">{icon}</span>
      </div>
      <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}
