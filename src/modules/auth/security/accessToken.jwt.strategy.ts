import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { ApiConfigService } from '../../../config/api-config.service';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService, private configService: ApiConfigService) {
    super({
      secretOrKey: configService.authConfig.accessSecretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['HS256'],
    });
  }

  async validate(payload) {
    const user: User = await this.authService.tokenValidateUser(payload);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
