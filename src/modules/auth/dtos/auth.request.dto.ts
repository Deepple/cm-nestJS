import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../user/dtos/user.request.dto';

export class AuthCredentialsDto extends PickType(CreateUserDto, ['email', 'password'] as const) {}
