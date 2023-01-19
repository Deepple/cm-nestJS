import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';
import { UserRepository } from '../user/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiConfigService } from '../../config/api-config.service';
import { UserModule } from '../user/user.module';
import { ApiConfigModule } from '../../config/api-config.module';
import { AccessTokenStrategy } from './security/accessToken.jwt.strategy';
import { RefreshTokenStrategy } from './security/refreshToken.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => ({
        privateKey: configService.authConfig.refreshPrivateKey,
        publicKey: configService.authConfig.refreshPublicKey,
        signOptions: {
          algorithm: 'RS256',
          expiresIn: configService.authConfig.refreshExpirationTime,
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
      inject: [ApiConfigService],
      imports: [ApiConfigModule],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
