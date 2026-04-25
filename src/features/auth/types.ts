// features/auth/types.ts

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
}