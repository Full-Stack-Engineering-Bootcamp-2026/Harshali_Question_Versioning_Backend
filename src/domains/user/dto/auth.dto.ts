export type RoleType = "ADMIN" | "USER";

export interface RegisterRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserResponseDto {
  id: number;
  publicId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleType;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  accessToken: string;
  user: UserResponseDto;
}

export interface AuthState {
  token: string | null;
  user: UserResponseDto | null;
}
