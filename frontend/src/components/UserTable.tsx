import { Check, X } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { InviteStatus, User } from '../types';

export function UserTable({
  title,
  users,
  isLoading,
  onStatusChange,
  actionUserId,
  emptyText,
}: {
  title: string;
  users: User[];
  isLoading: boolean;
  onStatusChange?: (id: string, status: InviteStatus) => void;
  actionUserId?: string;
  emptyText: string;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
        <span className="text-xs text-slate-500">{users.length} records</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">City</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              {onStatusChange ? (
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td className="px-4 py-5 text-slate-500" colSpan={5}>
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td className="px-4 py-5 text-slate-500" colSpan={5}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-950">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{user.email}</td>
                  <td className="px-4 py-3 text-slate-600">{user.city}</td>
                  <td className="px-4 py-3">
                    <StatusBadge label={user.status} tone="status" />
                  </td>
                  {onStatusChange ? (
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          disabled={actionUserId === user.id}
                          onClick={() => onStatusChange(user.id, 'APPROVED')}
                          className="inline-flex h-8 items-center gap-1 rounded-md bg-emerald-700 px-3 text-xs font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Check size={14} />
                          Approve
                        </button>
                        <button
                          type="button"
                          disabled={actionUserId === user.id}
                          onClick={() => onStatusChange(user.id, 'REJECTED')}
                          className="inline-flex h-8 items-center gap-1 rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <X size={14} />
                          Reject
                        </button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
