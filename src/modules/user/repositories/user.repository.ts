import { Repository } from 'typeorm';
import { StatusEnum, User } from '../entities/user.entity';
import { CustomRepository } from '../../../repository/typeorm-ex.decorator';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.request.dto';
import { BadRequestException, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PostgresErrorCode } from '../../../database/postgresErrorCodes.enum';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async saveUnique(user: User) {
    try {
      return await this.save(user);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException('Existing email');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const { password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ ...createUserDto, password: hashedPassword });
    await this.saveUnique(user);
    return { id: user.id };
  }

  async updateUser(id, updateUserDto: UpdateUserDto) {
    const user = await this.getUserById(id);
    Object.assign(user, updateUserDto);
    return await this.saveUnique(user);
  }

  async getUsersByStatusId(statusId) {
    if (!Object.values(StatusEnum).includes(statusId)) {
      console.log(StatusEnum);
      throw new BadRequestException(`Please check ${Object.values(StatusEnum).filter((v) => typeof v === 'number')}`);
    }

    const users = await this.find({
      where: { status: statusId },
      select: ['email', 'nickname', 'photos'],
      relations: { photos: true },
      // order: { id: 'asc' },
    });
    return users;
  }

  async getUserById(id) {
    const user = await this.findOne({ where: { id }, relations: { photos: true } });
    if (!user) {
      throw new NotFoundException('Invalid userId');
    }
    return user;
  }
}
