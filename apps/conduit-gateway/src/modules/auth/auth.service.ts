import { Injectable, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import { map } from 'rxjs';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './dto/output/user.dto';

const logger = new Logger();

@Injectable()
export class AuthService implements OnModuleInit {

  constructor(
    @Inject('AUTH-SERVICE') private readonly authClient: ClientKafka,
    private jwtService: JwtService
  ) { }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('users_list');
    this.authClient.subscribeToResponseOf('user_creation');
    this.authClient.subscribeToResponseOf('user_update');
  }

  getUsers() {
    return this.authClient.send('users_list', {}).pipe(
      map((users: User[]) => (users))
    )
  }

  async createUser(user: CreateUserInput) {
    logger.log('GATEWAY - Create user service')

    return this.authClient.send('user_creation', user).pipe(
      map(newUser => {
        logger.log('GATEWAY - User created successfully');

        const token = this.jwtService.sign(newUser);
        newUser['token'] = token;
        return newUser
      })
    );
  }

  // TODO: Protect with AuthGuard
  async updateUser(user: UpdateUserInput) {
    logger.log('GATEWAY - Update user service')

    return this.authClient.send('user_update', user).pipe(
      map(updatedUser => {
        logger.log('GATEWAY - User updated successfully');

        return updatedUser
      })
    );
  }
}
