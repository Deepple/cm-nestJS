import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/repositories/user.repository';
import { CreateUserDto } from '../user/dtos/user.request.dto';
import { AuthCredentialsDto } from './dtos/auth.request.dto';
import * as bcrypt from 'bcryptjs';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

  async signUp(createUserDto: CreateUserDto): Promise<object> {
    return this.userRepository.createUser(createUserDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string } | undefined> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: Payload = { id: user.id, email: user.email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('logIn failed');
    }
  }

  async tokenValidateUser(payload: Payload): Promise<User> {
    return await this.userRepository.findOne({ where: { id: payload.id, email: payload.email } });
  }
}
