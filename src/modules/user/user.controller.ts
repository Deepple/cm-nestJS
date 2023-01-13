import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dtos/user.request.dto';
import { User } from './entities/user.entity';

@Controller('api/users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id) {
    return await this.usersService.findOne(id);
  }

  @Post('/:id')
  async updateUser(@Param('id', ParseIntPipe) id, @Body() data: UpdateUserDto) {
    return await this.usersService.updateUser(id, data);
  }

  @Get('/status/:id')
  async getUsersByTestId(@Param('id', ParseIntPipe) id) {
    return await this.usersService.findUserByStatusId(id);
  }
}
