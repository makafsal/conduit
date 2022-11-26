import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserInput } from './dto/input/create-user.input';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  // @Post('/users')
  // createUser(@Body() createUserInput: CreateUserInput) {
  //   console.log('App controller');
  //   this.authService.createUser(createUserInput);
  // }

  @Post('/users')
  createUser(@Body() createUserInput: CreateUserInput) {
    console.log(createUserInput)
  }

  @Get('/users')
  getUsers() {
    return this.authService.getUsers();
  }

}
