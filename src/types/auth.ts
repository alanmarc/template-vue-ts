export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}
