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

  @MessagePattern('get_user')
  handleGetUser(user: User) {
    return this.userService.handleGetUser(user);
  }

  @MessagePattern('user_creation')
  handleUserCreation(user: User) {
    return this.userService.handleUserCreated(user);
  }

  @MessagePattern('user_update')
  handleUseUpdate(user: User) {
    return this.userService.handleUserUpdate(user);
  }

  @MessagePattern('validate_user')
  handleValidateUser(user: User) {
    return this.userService.handleValidateUser(user);
  }
}
