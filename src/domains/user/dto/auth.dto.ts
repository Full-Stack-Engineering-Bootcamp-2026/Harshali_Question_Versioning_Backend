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
  role: string;
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
