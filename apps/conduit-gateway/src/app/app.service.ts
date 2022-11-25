import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserInput } from '../shared/dto/input/create-user.input';
import { CreateUserEvent } from '../shared/events/user/create-user.event';

const logger = new Logger();
@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject('AUTH-SERVICE') private readonly communicationClient: ClientKafka
  ) { }

  getData(): { message: string } {
    return { message: 'Welcome to conduit-backend!' };
  }

  getUsers() {
    this.communicationClient.emit('users_list', {});
  }

  createUser(createUserInput: CreateUserInput) {
    logger.log('Triggered')
    this.users.push(createUserInput);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserInput.email)
    );
  }
}
