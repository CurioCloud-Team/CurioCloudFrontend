// src/types/auth.ts

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  full_name: string | null;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthResponse {
  user: UserResponse;
  token: Token;
  message: string;
}

export interface UserProfileResponse {
  id: number;
  username: string;
  email: string;
  full_name: string | null;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}
