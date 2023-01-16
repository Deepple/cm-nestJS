import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CustomRepository } from '../../../repository/typeorm-ex.decorator';
import { CreateUserDto } from '../dtos/user.request.dto';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PostgresErrorCode } from '../../../database/postgresErrorCodes.enum';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
    const { password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ ...createUserDto, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException('Existing email');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUsersByStatusId(statusId) {
    const users = await this.find({
      where: { status: statusId },
      relations: { photos: true },
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
