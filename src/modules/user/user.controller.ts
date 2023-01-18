import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/user.request.dto';
import { AuthGuard } from '../auth/security/auth.guard';

@Controller('api/users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Req() req) {
    console.log(req.user);
    return await this.userService.findAll();
  }

  @Get('/:id')
  async getUser(@Req() req, @Param('id', ParseIntPipe) id) {
    console.log(req.user);
    return await this.userService.findOne(id);
  }

  @Post('/:id')
  async updateUser(@Param('id', ParseIntPipe) id, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }
}
