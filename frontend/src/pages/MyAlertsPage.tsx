import { useState } from 'react';
import type { FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { getInviteStatus } from '../api/invites';
import { getApiError } from '../api/http';
import { PublicShell } from '../components/PublicShell';
import { StatusBadge } from '../components/StatusBadge';

export function MyAlertsPage() {
  const [emailInput, setEmailInput] = useState('');
  const [email, setEmail] = useState('');

  const inviteStatus = useQuery({
    queryKey: ['invite-status', email],
    queryFn: () => getInviteStatus(email),
    enabled: Boolean(email),
    retry: false,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmail(emailInput.trim());
  }

  return (
    <PublicShell>
      <section className="mx-auto w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">
          Check invite and alerts
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter the email used for the invite request. Approved users can see
          the weather alerts generated for their city.
        </p>

        <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
          <input
            value={emailInput}
            onChange={(event) => setEmailInput(event.target.value)}
            required
            type="email"
            placeholder="testuser@example.com"
            className="h-11 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            <Search size={16} />
            Check
          </button>
        </form>

        {inviteStatus.isLoading ? (
          <p className="mt-5 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Checking invite...
          </p>
        ) : null}

        {inviteStatus.isError ? (
          <p className="mt-5 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {getApiError(inviteStatus.error)}
          </p>
        ) : null}

        {inviteStatus.data ? (
          <div className="mt-6 space-y-5">
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-950">
                    {inviteStatus.data.user.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {inviteStatus.data.user.email} - {inviteStatus.data.user.city}
                  </p>
                </div>
                <StatusBadge label={inviteStatus.data.user.status} tone="status" />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-950">
                Delivered alerts
              </h2>
              <div className="mt-3 divide-y divide-slate-100 rounded-lg border border-slate-200">
                {inviteStatus.data.user.status !== 'APPROVED' ? (
                  <p className="px-4 py-4 text-sm text-slate-500">
                    Alerts are only visible after admin approval.
                  </p>
                ) : inviteStatus.data.alerts.length === 0 ? (
                  <p className="px-4 py-4 text-sm text-slate-500">
                    No alerts have been generated for this user yet.
                  </p>
                ) : (
                  inviteStatus.data.alerts.map((alert) => (
                    <article key={alert.id} className="px-4 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-slate-950">
                          {alert.condition} in {alert.city}
                        </p>
                        <StatusBadge label={alert.severity} tone="severity" />
                      </div>
                      <p className="mt-1 text-sm text-slate-600">
                        {alert.message}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        {alert.temperature} C -{' '}
                        {new Date(alert.createdAt).toLocaleString()}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </PublicShell>
  );
}
