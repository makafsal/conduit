import { Injectable, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { map } from 'rxjs';
import { CreateUserInput } from './dto/input/create-user.input';
import { CreateUserEvent } from './events/create-user.event';

const logger = new Logger();

@Injectable()
export class AuthService implements OnModuleInit {

  constructor(
    @Inject('AUTH-SERVICE') private readonly communicationClient: ClientKafka
  ) { }

  onModuleInit() {
    this.communicationClient.subscribeToResponseOf('users_list');
  }

  async getUsers() {
    // return this.communicationClient.send('users_list', {}).subscribe((users) => {
    //   logger.log('Response ', users)
    //   return users;
    // });
    return this.communicationClient.send('users_list', {}).pipe(
      map((message) => ({
        message
      }))
    )
  }

  createUser(createUserInput: CreateUserInput) {
    logger.log('Triggered')

    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserInput.email)
    );
  }
}
