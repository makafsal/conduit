import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateUserEvent } from './events/create-user.event';
import { UserService } from './user.service';

@Controller()
export class UserController {

  constructor(private readonly appService: UserService) { }

  // TODO: Remove below listing
  @MessagePattern('users_list')
  handleGetUsers() {
    return this.appService.handleGetUsers();
  }

  @EventPattern('user_created')
  handleUserCreated(data: CreateUserEvent) {
    this.appService.handleUserCreated(data);
  }
}
