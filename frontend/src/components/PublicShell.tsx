import type { ReactNode } from 'react';
import { CloudSun } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/request-invite" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-700 text-white">
              <CloudSun size={20} />
            </span>
            <span className="text-sm font-semibold text-slate-950">
              WeatherGuard
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              to="/my-alerts"
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              My alerts
            </Link>
            <Link
              to="/login"
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Admin login
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-5xl items-center px-4 py-8">
        {children}
      </main>
    </div>
  );
}
