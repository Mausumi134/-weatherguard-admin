import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { getApiError } from '../api/http';
import { PublicShell } from '../components/PublicShell';
import { useAuth } from '../providers/AuthProvider';

export function LoginPage() {
  const navigate = useNavigate();
  const { token, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PublicShell>
      <section className="mx-auto w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">Admin login</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to review invite requests and trigger weather alerts.
        </p>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              placeholder="admin@weatherguard.local"
              className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              placeholder="Enter password"
              className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          {error ? (
            <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn size={16} />
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          Need access?{' '}
          <Link to="/request-invite" className="font-medium text-emerald-700">
            Request invite
          </Link>
        </p>
      </section>
    </PublicShell>
  );
}
