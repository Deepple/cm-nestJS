import { Repository } from 'typeorm';
import { Photo, User } from '../entities/user.entity';
import { CustomRepository } from '../../../repository/typeorm-ex.decorator';
import { CreateUserDto } from '../dtos/user.request.dto';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  // async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   const { email, nickname, password, name, status, photos } = createUserDto;
  //   const user = this.create(createUserDto);
  //   await this.save(user);
  //   return user;
  // }

  async getUsersByTestId(id) {
    const users = await this.find({
      where: { status: id },
    });
    return users;
  }

  async getUserById(id) {
    const user = await this.findOne({ where: { id: id }, relations: { photos: true } });
    return user;
  }
}
