import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { ApiConfigModule } from './config/api-config.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { SuccessInterceptor } from './interceptors/success.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HTTPExceptionFilter } from './filters/http-exception.filter';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), ApiConfigModule, UserModule, AuthModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: SuccessInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_FILTER, useClass: HTTPExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
