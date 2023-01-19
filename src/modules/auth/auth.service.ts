import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/repositories/user.repository';
import { CreateUserDto } from '../user/dtos/user.request.dto';
import { AuthCredentialsDto } from './dtos/auth.request.dto';
import * as bcrypt from 'bcryptjs';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { ApiConfigService } from '../../config/api-config.service';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService, private configService: ApiConfigService) {}

  async signUp(createUserDto: CreateUserDto): Promise<object> {
    return this.userRepository.createUser(createUserDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string } | undefined> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: Payload = { id: user.id, email: user.email };
      return this.createTokens(payload);
    } else {
      throw new UnauthorizedException('logIn failed');
    }
  }

  async refreshTokens(user: User) {
    const payload: Payload = { id: user.id, email: user.email };
    return this.createTokens(payload);
  }

  async createTokens(payload: Payload) {
    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(payload);
    return {
      refreshExpireIn: this.configService.authConfig.refreshExpirationTime,
      accessExpireIn: this.configService.authConfig.accessExpirationTime,
      accessToken,
      refreshToken,
    };
  }

  async createAccessToken(payload: Payload) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.authConfig.accessSecretKey,
      algorithm: 'HS256',
      expiresIn: this.configService.authConfig.accessExpirationTime,
    });
  }

  async createRefreshToken(payload: Payload) {
    return await this.jwtService.signAsync(payload);
  }

  async tokenValidateUser(payload: Payload): Promise<User> {
    return await this.userRepository.findOne({ where: { id: payload.id, email: payload.email } });
  }
}
