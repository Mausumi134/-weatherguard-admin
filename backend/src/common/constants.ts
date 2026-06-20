export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export const INVITE_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export const ALERT_SEVERITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type InviteStatus =
  (typeof INVITE_STATUS)[keyof typeof INVITE_STATUS];
export type AlertSeverity =
  (typeof ALERT_SEVERITY)[keyof typeof ALERT_SEVERITY];
