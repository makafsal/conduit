import { Injectable, Inject, Logger, OnModuleInit, NotFoundException, UnprocessableEntityException, BadRequestException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { map } from 'rxjs';
import { jwtConstants } from '../../shared/constants';
import { CreateUserInput } from './dto/input/create-user.input';
import { GetUserInput } from './dto/input/get-user.input';
import { LoginUserInput } from './dto/input/login-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { ValidateUserInput } from './dto/input/validate-user.input';
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
    this.authClient.subscribeToResponseOf('get_user');
    this.authClient.subscribeToResponseOf('validate_user');
  }

  getUsers() {
    return this.authClient.send('users_list', {}).pipe(
      map((users: User[]) => (users))
    )
  }

  getUser(user: GetUserInput) {
    return this.authClient.send('get_user', user).pipe(
      map(r_user => r_user)
    )
  }

  createUser(user: CreateUserInput) {
    logger.log('GATEWAY - Create user service')

    return this.authClient.send('user_creation', user).pipe(
      map(newUser => {
        if (!newUser) {
          logger.log('GATEWAY - User creation failed');
          throw new BadRequestException('Email already taken');
        }


        logger.log('GATEWAY - User created successfully');

        const token = this.jwtService.sign(newUser);
        newUser['token'] = token;
        return newUser
      })
    );
  }

  updateUser(user: UpdateUserInput) {
    logger.log('GATEWAY - Update user service');

    return this.authClient.send('user_update', user).pipe(
      map(updatedUser => {
        if (!updatedUser) {
          logger.log('GATEWAY - User not updated');
          return new RpcException('User not found');
        }

        logger.log('GATEWAY - User updated successfully');
        return updatedUser;
      })
    );
  }

  async validateUser(user: ValidateUserInput) {
    return this.authClient.send('validate_user', user).pipe(
      map(validUser => validUser)
    );
  }

  async login(user: LoginUserInput) {
    return this.authClient.send('validate_user', user).pipe(
      map(validUser => {
        if (validUser) {
          return {
            ...validUser,
            token: this.jwtService.sign(validUser)
          }
        }

        throw new NotFoundException('Incorrect Username or Password');
      })
    );
  }
}