export type InviteStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type UserRole = 'ADMIN' | 'USER';
export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH';

export type User = {
  id: string;
  email: string;
  name: string;
  city: string;
  role: UserRole;
  status: InviteStatus;
  createdAt: string;
  updatedAt: string;
};

export type WeatherAlert = {
  id: string;
  userId: string;
  city: string;
  condition: string;
  temperature: number;
  severity: AlertSeverity;
  message: string;
  createdAt: string;
  user: Pick<User, 'id' | 'name' | 'email' | 'city'>;
};

export type UserWeatherAlert = Omit<WeatherAlert, 'user'>;

export type InviteStatusResponse = {
  user: User;
  alerts: UserWeatherAlert[];
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type InviteRequest = {
  name: string;
  email: string;
  city: string;
};
