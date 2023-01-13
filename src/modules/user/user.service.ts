import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from './dtos/user.request.dto';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({ relations: { photos: true }, order: { id: 'asc' } });

    // for (const user of users) {
    //   console.log(user.photos);
    // }
    return users;
  }

  async createUsers(data: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(data);
    console.log(user.photos);
    return await this.usersRepository.save(user);
  }

  async findUserByStatusId(statusId): Promise<User[]> {
    return await this.usersRepository.getUsersByTestId(statusId);
  }

  async findOne(id): Promise<User> {
    return await this.usersRepository.getUserById(id);
  }

  async updateUser(id, data: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, { ...data });
    return;
  }
}
