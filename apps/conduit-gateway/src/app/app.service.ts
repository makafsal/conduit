import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserInput } from '../shared/dto/input/create-user.input';
import { CreateUserEvent } from '../shared/events/user/create-user.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject('AUTH-SERVICE') private readonly communicationClient: ClientProxy
  ) {}

  getData(): { message: string } {
    return { message: 'Welcome to conduit-backend!' };
  }

  createUser(createUserInput: CreateUserInput) {
    console.log('ggi');
    this.users.push(createUserInput);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserInput.email)
    );
  }
}
