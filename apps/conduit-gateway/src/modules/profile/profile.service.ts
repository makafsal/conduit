import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

const logger = new Logger();
@Injectable()
export class ProfileService implements OnModuleInit {

  constructor(
    @Inject('PROFILE-SERVICE') private readonly profileClient: ClientKafka
  ) { }

  onModuleInit() {
    this.profileClient.subscribeToResponseOf('profile_get');
    this.profileClient.subscribeToResponseOf('follow');
    this.profileClient.subscribeToResponseOf('unfollow');
  }

  getProfile(profileArgs) {
    logger.log('GATEWAY - Calling Profile Service');

    return this.profileClient.send('profile_get', profileArgs);
  }

  follow(followArgs) {
    logger.log('GATEWAY - Calling Profile Service Follow Method');

    return this.profileClient.send('follow', followArgs);
  }

  unFollow(unFollowArgs) {
    logger.log('GATEWAY - Calling Profile Service Unfollow Method');

    return this.profileClient.send('unfollow', unFollowArgs);
  }
}
