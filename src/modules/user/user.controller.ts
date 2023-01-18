import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/user.request.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { GetUser } from '../../decorators/custom.decorator';

@Controller('api/users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@GetUser() user) {
    console.log(user);
    return await this.userService.findAll();
  }

  @Get('/:id')
  async getUser(@GetUser() user, @Param('id', ParseIntPipe) id) {
    console.log(user);
    return await this.userService.findOne(id);
  }

  @Post('/:id')
  async updateUser(@GetUser() user, @Param('id', ParseIntPipe) id, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }
}
