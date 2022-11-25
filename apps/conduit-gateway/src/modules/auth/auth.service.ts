import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserInput } from './dto/input/create-user.input';
import { CreateUserEvent } from './events/create-user.event';

const logger = new Logger();

@Injectable()
export class AuthService {

  constructor(
    @Inject('AUTH-SERVICE') private readonly communicationClient: ClientKafka
  ) { }

  getUsers() {
    this.communicationClient.emit('users_list', {});
  }

  createUser(createUserInput: CreateUserInput) {
    logger.log('Triggered')

    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserInput.email)
    );
  }
}
