import {
  Injectable,
  Inject,
  Logger,
  OnModuleInit,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { map } from 'rxjs';
import { CreateUserInput } from '../../shared/types/user/input/create-user.input';
import { GetUserInput } from '../../shared/types/user/input/get-user.input';
import { LoginUserInput } from '../../shared/types/user/input/login-user.input';
import { UpdateUserInput } from '../../shared/types/user/input/update-user.input';
import { ValidateUserInput } from '../../shared/types/user/input/validate-user.input';
import { User } from '../../shared/types/user/user.dto';

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
    this.authClient.subscribeToResponseOf('get_user_by_email');
    this.authClient.subscribeToResponseOf('validate_user');
  }

  getUsers() {
    return this.authClient.send('users_list', {}).pipe(
      map((users: User[]) => (users))
    )
  }

  getUser(email: string) {
    return this.authClient.send('get_user_by_email', email).pipe(
      map(r_user => r_user)
    )
  }

  createUser(user: CreateUserInput) {
    logger.log('GATEWAY - Create user service')

    return this.authClient.send('user_creation', user).pipe(
      map(newUser => {
        if (!newUser) {
          logger.log('GATEWAY - User creation failed');
          throw new BadRequestException('Email or Username already taken');
        }


        logger.log('GATEWAY - User created successfully');

        const token = this.jwtService.sign(newUser);
        newUser['token'] = token;
        return newUser;
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