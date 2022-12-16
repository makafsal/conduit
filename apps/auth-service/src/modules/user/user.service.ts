import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
    logger.log('AUTH-SERVICE - Getting Users');
    const users = await this.userRepository.getUsers();
    logger.log('Users: ', JSON.stringify(users));

    return users;
  }

  async handleGetUser(user: User) {
    logger.log('AUTH-SERVICE: FindUser triggered')
    const found_user = await (await this.userRepository.getUser(user)).first();

    if (found_user) {
      logger.log('AUTH-SERVICE - User found');
      delete found_user.password;

      return found_user;
    }

    logger.log('AUTH-SERVICE - User not found');
    return;
  }

  async handleUserCreated(user: User) {
    logger.log('AUTH-SERVICE - Create User triggered');

    const found_user = await (await this.userRepository.getUser(user)).first();
    if (found_user) {
      logger.log('AUTH-SERVICE - Email already taken');
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    await this.userRepository.createUser(user);
    delete user.password;

    return user;
  }

  async handleUserUpdate(user: User) {
    // TODO: Encrypt password while updating user
    logger.log('AUTH-SERVICE - Updating User');
    const currentUser = await this.handleGetUser(user);

    if (currentUser) {
      await this.userRepository.updateUser(user);

      const updatedUser = await this.handleGetUser(user);
      delete updatedUser.password;

      return updatedUser;
    }
  }

  async handleValidateUser(user: User) {
    logger.log('AUTH-SERVICE - Validating User');

    const found_user = await (await this.userRepository.getUser(user)).first();
    if (found_user) {
      const isPasswordOk = await bcrypt.compare(user.password, found_user.password);

      if (isPasswordOk) {
        logger.log('AUTH-SERVICE - Login Successful');
        return found_user;
      }
    }

    logger.log('AUTH-SERVICE - Login Failed');
    return;
  }
}
