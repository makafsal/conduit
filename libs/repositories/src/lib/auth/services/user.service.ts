import { Injectable, Logger } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserRepository } from '../user.repository';
import * as bcrypt from 'bcrypt';

const logger = new Logger();

@Injectable()
export class UserService {

  constructor(
    private userRepository: UserRepository,
  ) { }

  async getAll() {
    logger.log('AUTH-SERVICE - Getting Users');
    const users = await this.userRepository.getUsers();

    return users;
  }

  async getUserByEmail(email: string) {
    logger.log('AUTH-SERVICE: FindUser triggered')
    const found_user = await this.userRepository.getUserByEmail(email);

    if (found_user) {
      logger.log('AUTH-SERVICE - User found');
      delete found_user.password;

      return found_user;
    }

    logger.log('AUTH-SERVICE - User not found');
    return;
  }

  async create(user: User) {
    logger.log('AUTH-SERVICE - Create User triggered');

    const existing_email = await this.userRepository.getUserByEmail(user.email);
    const existing_username = await this.userRepository.getUserByUsername(user.username);

    if (existing_email || existing_username) {
      logger.log('AUTH-SERVICE - Email or Username already taken');
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    await this.userRepository.createUser(user);
    delete user.password;

    return user;
  }

  async update(user: User) {
    logger.log('AUTH-SERVICE - Updating User');
    const currentUser = await this.getUserByEmail(user.email);

    if (currentUser) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      await this.userRepository.updateUser(user);

      const updatedUser = await this.getUserByEmail(user.email);
      delete updatedUser.password;

      return updatedUser;
    }
  }

  async validateUser(user: User) {
    logger.log('AUTH-SERVICE - Validating User');

    const found_user = await this.userRepository.getUserByEmail(user.email);
    if (found_user) {
      const isPasswordOk = await bcrypt.compare(user.password, found_user.password);

      if (isPasswordOk) {
        logger.log('AUTH-SERVICE - Login Successful');
        return found_user;
      }
    }

    logger.log('AUTH-SERVICE - Invalid Failed');
    return;
  }
}
