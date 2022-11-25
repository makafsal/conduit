import { Injectable, Logger } from '@nestjs/common';
import { CreateUserEvent } from '../shared/events/create-user.event';
import { AppRepository } from './app.respository';

const logger = new Logger();
@Injectable()
export class AppService {

  constructor(private userRepository: AppRepository) { }

  getData(): { message: string } {
    return { message: 'Welcome to auth-service!' };
  }

  async handleGetUsers() {
    logger.log('HandleGetUsers - AUTH-SERVICE ');
    const users = await this.userRepository.getUsers();
    logger.log('Users: ', users);
  }

  handleUserCreated(userCreatedEvent: CreateUserEvent) {
    logger.log('handleUserCreated - AUTH-SERVICE ', userCreatedEvent);
  }
}
