import { Post, Body, Controller, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dtos/user.request.dto';
import { AuthCredentialsDto } from './dtos/auth.request.dto';
import { JwtRefreshGuard } from '../../guards/jwt-refresh.guard';
import { GetUser } from '../../decorators/custom.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  refresh(@GetUser() user) {
    return this.authService.refreshTokens(user);
  }
}
