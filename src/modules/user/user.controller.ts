import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/user.request.dto';
import { JwtAccessGuard } from '../../guards/jwt-access.guard';
import { GetUser } from '../../decorators/getUser.decorator';
import { OwnUserGuard } from '../../guards/own-user.guard';

@Controller('api/users')
@UseGuards(JwtAccessGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@GetUser() user) {
    return this.userService.findAll();
  }

  @Get('/:id')
  @UseGuards(OwnUserGuard)
  getUser(@GetUser() user, @Param('id', ParseIntPipe) id) {
    return this.userService.findOne(id);
  }

  @Post('/:id')
  @UseGuards(OwnUserGuard)
  updateUser(@GetUser() user, @Param('id', ParseIntPipe) id, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
