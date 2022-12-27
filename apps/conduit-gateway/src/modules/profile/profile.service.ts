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
    logger.log('GATEWAY - Calling Profile Service');
    
    return this.profileClient.send('profile_get', profileArgs).pipe(
      map(profile => profile)
    );
  }
}
