import { Body, Controller, Get, Param, ParseEnumPipe, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/user.request.dto';
import { StatusEnum } from './entities/user.entity';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id) {
    return await this.userService.findOne(id);
  }

  @Post('/:id')
  async updateUser(@Param('id', ParseIntPipe) id, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Get('/status/:id')
  async getUsersByTestId(@Param('id', ParseIntPipe) statusId) {
    return await this.userService.findUserByStatusId(statusId);
  }
}
