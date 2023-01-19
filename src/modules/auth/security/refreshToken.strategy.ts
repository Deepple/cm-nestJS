import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ApiConfigService } from '../../../config/api-config.service';
import { User } from '../../user/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private authService: AuthService, private configService: ApiConfigService) {
    super({
      secretOrKey: configService.authConfig.refreshPublicKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256'],
    });
  }

  async validate(req, payload) {
    const user: User = await this.authService.tokenValidateUser(payload);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
