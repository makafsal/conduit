import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserEvent } from './events/create-user.event';
import { UserService } from './user.service';

@Controller()
export class UserController {

  constructor(private readonly appService: UserService) { }

  @EventPattern('users_list')
  handleGetUsers() {
    this.appService.handleGetUsers();
  }

  @EventPattern('user_created')
  handleUserCreated(data: CreateUserEvent) {
    this.appService.handleUserCreated(data);
  }
}
