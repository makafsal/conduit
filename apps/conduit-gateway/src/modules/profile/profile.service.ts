import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ProfileService implements OnModuleInit {
  
  constructor(
    @Inject('PROFILE-SERVICE') private readonly profileClient: ClientKafka
  ) {}

  onModuleInit() {
    this.profileClient.subscribeToResponseOf('profile_get');
  }

  getProfile() {
    return this.profileClient.send('profile_get', {}).pipe(
      map((profile) => {
        console.log(profile)
        return profile;
      })
    );
  }
}
