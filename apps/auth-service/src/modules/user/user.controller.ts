import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  // TODO: Remove below listing
  @MessagePattern('users_list')
  handleGetUsers() {
    return this.userService.handleGetUsers();
  }

  @MessagePattern('user_creation')
  handleUserCreation(user: User) {
    return this.userService.handleUserCreated(user);
  }

  @MessagePattern('user_update')
  handleUseUpdate(user: User) {
    // TODO: Check user exists
    // TODO: Fetch and return the updated user 
    return this.userService.handleUserUpdate(user);
  }
}
