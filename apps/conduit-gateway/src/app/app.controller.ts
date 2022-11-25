import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserInput } from '../shared/dto/input/create-user.input';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('/users')
  createUser(@Body() createUserInput: CreateUserInput) {
    console.log('App controller');
    this.appService.createUser(createUserInput);
  }

  @Get('/users')
  getUsers() {
    this.appService.getUsers();
  }
}
