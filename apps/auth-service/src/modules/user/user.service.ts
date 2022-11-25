import { Injectable, Logger } from '@nestjs/common';
import { CreateUserEvent } from './events/create-user.event';
import { UserRepository } from './user.respository';

const logger = new Logger();

@Injectable()
export class UserService {

  constructor(private userRepository: UserRepository) { }

  async handleGetUsers() {
    logger.log('HandleGetUsers - AUTH-SERVICE ');
    const users = await this.userRepository.getUsers();
    logger.log('Users: ', users);
  }

  handleUserCreated(userCreatedEvent: CreateUserEvent) {
    logger.log('handleUserCreated - AUTH-SERVICE ', userCreatedEvent);
  }
}
