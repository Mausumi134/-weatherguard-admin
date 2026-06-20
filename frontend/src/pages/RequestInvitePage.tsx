import { useState } from 'react';
import type { FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { requestInvite } from '../api/invites';
import { getApiError } from '../api/http';
import { PublicShell } from '../components/PublicShell';

export function RequestInvitePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  const inviteMutation = useMutation({
    mutationFn: requestInvite,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    inviteMutation.mutate({ name, email, city });
  }

  return (
    <PublicShell>
      <div className="grid gap-8 md:grid-cols-[1fr_420px] md:items-center">
        <section>
          <p className="mb-3 text-sm font-medium text-emerald-700">
            Invitation-based weather alerts
          </p>
          <h1 className="max-w-xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Request access before alerts are enabled for your location.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
            WeatherGuard keeps new users in a pending queue until an admin
            reviews the request. Approved users are included in scheduled
            weather alert checks.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-md border border-slate-200 bg-white px-3 py-2">
              Pending review
            </span>
            <span className="rounded-md border border-slate-200 bg-white px-3 py-2">
              Admin approval
            </span>
            <span className="rounded-md border border-slate-200 bg-white px-3 py-2">
              Alert simulation
            </span>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Request invite
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Use any email to create a pending user for the admin dashboard.
          </p>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                minLength={2}
                className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                placeholder="Aarav Mehta"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                placeholder="aarav@example.com"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">City</span>
              <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                required
                minLength={2}
                className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                placeholder="Delhi"
              />
            </label>

            {inviteMutation.isSuccess ? (
              <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                Invite submitted. You can check approval and alerts from the My
                alerts page.
              </p>
            ) : null}

            {inviteMutation.isError ? (
              <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {getApiError(inviteMutation.error)}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={inviteMutation.isPending}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={16} />
              {inviteMutation.isPending ? 'Submitting...' : 'Submit request'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-500">
            Already requested?{' '}
            <Link to="/my-alerts" className="font-medium text-emerald-700">
              Check alerts
            </Link>
            <span className="px-2">/</span>
            Admin?{' '}
            <Link to="/login" className="font-medium text-emerald-700">
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </PublicShell>
  );
}
