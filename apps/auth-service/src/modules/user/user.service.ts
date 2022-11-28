import { Injectable, Logger } from '@nestjs/common';
import { User } from './models/user.model';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

const logger = new Logger();

@Injectable()
export class UserService {

  constructor(
    private userRepository: UserRepository,
  ) { }

  async handleGetUsers() {
    logger.log('HandleGetUsers - AUTH-SERVICE ');
    const users = await this.userRepository.getUsers();
    logger.log('Users: ', JSON.stringify(users));
    return users;
  }

  async handleUserCreated(user: User) {
    logger.log('AUTH-SERVICE - handleUserCreated');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    await this.userRepository.createUser(user);
    delete user.password;

    return {
      ...user,
      bio: '',
      image: ''
    }
  }

  async handleUserUpdate(user: User) {
    logger.log('AUTH-SERVICE - handleUserUpdate');
    return this.userRepository.updateUser(user);
  }
}
