import { AuthResponseDto, LoginRequestDto } from "./../dto/auth.dto";
import { Service } from "typedi";
import argon2 from "argon2";

import { UserRepository } from "../repository/user.repository";
import { RegisterRequestDto, UserResponseDto } from "../dto/auth.dto";
import { ROLES } from "../../../common/constants/roles.constants";
import { UnauthorizedException } from "../../../common/exceptions";
import { AuthErrorMessages } from "../../../common/constants/auth-error-messages.constants";
import { NotFoundException } from "../../../common/exceptions";
import jwt from "jsonwebtoken";
@Service()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(data: RegisterRequestDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await argon2.hash(data.password);

    const user = await this.userRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      role: ROLES.USER,
    });

    return {
      id: user.id,
      publicId: user.publicId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
    };
  }

  public async login(data: LoginRequestDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException(AuthErrorMessages.INVALID_CREDENTIALS);
    }
    if (!user.isActive) {
      throw new UnauthorizedException(AuthErrorMessages.ACCOUNT_DEACTIVATED);
    }
    const isPasswordValid = await argon2.verify(user.password, data.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(AuthErrorMessages.INVALID_CREDENTIALS);
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new NotFoundException("JWT_SECRET is not configured");
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        publicId: user.publicId,
        email: user.email,
        role: user.role,
      },
      secret,
      {
        expiresIn: "7d",
      },
    );

    const responseUser: UserResponseDto = {
      id: user.id,
      publicId: user.publicId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return {
      accessToken,
      user: responseUser,
    };
  }
}
