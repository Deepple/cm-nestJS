import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/user.request.dto';
import { JwtAccessGuard } from '../../guards/jwt-access.guard';
import { GetUser } from '../../decorators/getUser.decorator';
import { OwnUserGuard } from '../../guards/own-user.guard';
import { PageRequestDto } from '../../common/dtos/page.request.dto';

@Controller('api/users')
@UseGuards(JwtAccessGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query() page: PageRequestDto, @GetUser() user) {
    return this.userService.findAll(page);
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
