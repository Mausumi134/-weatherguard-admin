import type { AlertSeverity, InviteStatus } from '../types';

const statusStyles: Record<InviteStatus, string> = {
  PENDING: 'bg-amber-50 text-amber-800 ring-amber-200',
  APPROVED: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  REJECTED: 'bg-rose-50 text-rose-800 ring-rose-200',
};

const severityStyles: Record<AlertSeverity, string> = {
  LOW: 'bg-slate-100 text-slate-700 ring-slate-200',
  MEDIUM: 'bg-orange-50 text-orange-800 ring-orange-200',
  HIGH: 'bg-red-50 text-red-800 ring-red-200',
};

export function StatusBadge({
  label,
  tone,
}: {
  label: InviteStatus | AlertSeverity;
  tone: 'status' | 'severity';
}) {
  const styles =
    tone === 'status'
      ? statusStyles[label as InviteStatus]
      : severityStyles[label as AlertSeverity];

  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles}`}
    >
      {label}
    </span>
  );
}
