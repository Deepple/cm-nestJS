import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UpdateUserDto } from './dtos/user.request.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['photos'],
      order: { id: 'asc' },
    });
    return users;
  }

  async findUserByStatusId(statusId): Promise<User[]> {
    return await this.userRepository.getUsersByStatusId(statusId);
  }

  async findOne(id): Promise<User> {
    return await this.userRepository.getUserById(id);
  }

  async updateUser(id, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.updateUser(id, updateUserDto);
  }
}
