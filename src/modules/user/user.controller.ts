import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dtos/user.request.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.usersService.createUsers(data);
  }

  @Get('/:id')
  async getUser(@Param('id') id) {
    return await this.usersService.findOne(id);
  }

  @Post('/:id')
  async updateUser(@Param('id') id, @Body() data: UpdateUserDto) {
    return await this.usersService.updateUser(id, data);
  }

  @Get('/status/:id')
  async getUsersByTestId(@Param('id') id) {
    return await this.usersService.findUserByStatusId(id);
  }
}
