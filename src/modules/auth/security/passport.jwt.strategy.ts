import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../user/entities/user.entity';
import { AuthService } from '../auth.service';
import { ApiConfigService } from '../../../config/api-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, configService: ApiConfigService) {
    super({ secretOrKey: configService.authConfig.publicKey, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() });
  }

  async validate(payload) {
    const user: User = await this.authService.tokenValidateUser(payload);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
