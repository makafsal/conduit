import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from '../shared/events/create-user.event';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to auth-service!' };
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log('handleUserCreated - AUTH-SERVICE ', data);
  }
}
