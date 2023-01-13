import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from './dtos/user.request.dto';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({
      relations: ['photos'],
      select: ['id', 'name', 'photos'],
      order: { id: 'asc' },
    });
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // return this.usersRepository.createUser(createUserDto);
    return await this.usersRepository.save(createUserDto);
  }

  async findUserByStatusId(id): Promise<User[]> {
    return await this.usersRepository.getUsersByTestId(id);
  }

  async findOne(id): Promise<User> {
    return await this.usersRepository.getUserById(id);
  }

  async updateUser(id, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return user;
  }
}
