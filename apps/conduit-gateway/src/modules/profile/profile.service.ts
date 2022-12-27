import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { map } from 'rxjs';

const logger = new Logger();
@Injectable()
export class ProfileService implements OnModuleInit {

  constructor(
    @Inject('PROFILE-SERVICE') private readonly profileClient: ClientKafka
  ) { }

  onModuleInit() {
    this.profileClient.subscribeToResponseOf('profile_get');
  }

  getProfile(profileArgs) {
    return this.profileClient.send('profile_get', profileArgs).pipe(
      map(profile => {
        if (!profile) {
          logger.log('GATEWAY - Profile not updated');
          return new RpcException('Profile not found');
        }

        logger.log('GATEWAY - Profile retrieved');

        console.log(profile)
        return profile;
      })
    );
  }
}
