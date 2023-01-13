import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CustomRepository } from '../../../repository/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async getUsersByTestId(statusId) {
    const users = await this.find({
      where: { status: statusId },
    });
    return users;
  }

  async getUserById(id) {
    const user = await this.findOne({ where: { id: id }, relations: { photos: true } });
    return user;
  }
}
