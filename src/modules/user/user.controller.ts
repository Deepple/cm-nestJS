import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/user.request.dto';
import { JwtAccessGuard } from '../../guards/jwt-access.guard';
import { GetUser } from '../../decorators/custom.decorator';

@Controller('api/users')
@UseGuards(JwtAccessGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@GetUser() user) {
    console.log(user);
    return this.userService.findAll();
  }

  @Get('/:id')
  getUser(@GetUser() user, @Param('id', ParseIntPipe) id) {
    console.log(user);
    return this.userService.findOne(id);
  }

  @Post('/:id')
  updateUser(@GetUser() user, @Param('id', ParseIntPipe) id, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
