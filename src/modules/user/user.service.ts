import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UpdateUserDto } from './dtos/user.request.dto';
import { PageRequestDto } from '../../common/dtos/page.request.dto';
import { Page } from '../../common/page';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll(page: PageRequestDto): Promise<Page<User>> {
    const total = await this.userRepository.count();
    const users = await this.userRepository.find({
      relations: ['photos'],
      order: { id: 'asc' },
      take: page.getLimit(),
      skip: page.getOffset(),
    });
    return new Page(total, page.size, users);
  }

  async findOne(id): Promise<User> {
    return await this.userRepository.getUserById(id);
  }

  async updateUser(id, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.updateUser(id, updateUserDto);
  }
}
